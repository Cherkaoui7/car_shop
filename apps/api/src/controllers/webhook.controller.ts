// apps/api/src/controllers/webhook.controller.ts
import { Request, Response } from 'express';
import crypto from 'crypto';
import { prisma } from '../lib/prisma';

export const handleBankSettlement = async (req: Request, res: Response) => {
  try {
    const incomingSignature = req.headers['x-aurora-bank-signature'];
    if (!incomingSignature || typeof incomingSignature !== 'string') {
      return res.status(401).json({ error: "MISSING_CRYPTOGRAPHIC_BANK_SIGNATURE" });
    }

    // req.body is preserved as a raw Buffer by our specialized route mount
    const rawBodyBuffer = req.body as Buffer;
    const secret = process.env.BANK_WEBHOOK_SECRET!;
  
    const computedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBodyBuffer)
      .digest('hex');

    const incomingBuffer = Buffer.from(incomingSignature);
    const computedBuffer = Buffer.from(computedSignature);

    if (incomingBuffer.length !== computedBuffer.length || !crypto.timingSafeEqual(incomingBuffer, computedBuffer)) {
      console.error("[SECURITY ALERT]: Forged Webhook signature intercepted and dropped!");
      return res.status(403).json({ error: "HMAC_SIGNATURE_MISMATCH" });
    }

    const eventData = JSON.parse(rawBodyBuffer.toString('utf8'));
    const { intentToken, event } = eventData;

    if (event !== 'TRANSACTION_SETTLED_SUCCESS') {
      return res.status(200).json({ status: "IGNORED_NON_SETTLEMENT_EVENT" });
    }

    // Idempotent State Ratification
    await prisma.$transaction(async (tx) => {
      const order = await tx.reservationOrder.findUnique({ where: { intentToken } });
      if (!order) throw new Error("UNINDEXED_INTENT_TOKEN");

      // IDEMPOTENCY GUARD: If already secured, silently acknowledge to stop bank retries
      if (order.status === 'DEPOSIT_SECURED') return;

      await tx.reservationOrder.update({
        where: { intentToken },
        data: { status: 'DEPOSIT_SECURED' }
      });

      console.log(`[RATIFICATION COMPLETE]: Ledger Mutex officially ratified for ${order.orderNumber}`);
    });

    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error(`[WEBHOOK PANIC]: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};
