// apps/api/src/lib/mock-bank.ts
import crypto from 'crypto';

export const dispatchSyntheticBankClearing = (intentToken: string, orderNumber: string) => {
  // Simulate 6-second interbank settlement latency
  setTimeout(async () => {
    const payload = JSON.stringify({
      event: 'TRANSACTION_SETTLED_SUCCESS',
      intentToken,
      orderNumber,
      timestamp: new Date().toISOString(),
    });

    // Forge Bank HMAC-SHA256 Signature
    const secret = process.env.BANK_WEBHOOK_SECRET!;
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    console.log(`[CENTRAL BANK DAEMON]: Wire settled for ${orderNumber}. Dispatching signed Webhook...`);

    try {
      await fetch('http://localhost:5000/api/v1/webhooks/bank-settlement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-aurora-bank-signature': signature,
        },
        body: payload,
      });
    } catch (e: any) {
      console.error(`[BANK DAEMON PANIC]: Failed to deliver settlement packet: ${e.message}`);
    }
  }, 6000);
};
