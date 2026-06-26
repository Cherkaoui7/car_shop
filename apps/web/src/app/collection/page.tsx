// apps/web/src/app/collection/page.tsx
// PROJECT OBSIDIAN — Fleet Collection
import { fetchCatalog, resolveImageUrl } from '@carshop/api-client';
import Link from 'next/link';
import FilterSidebar from './FilterSidebar';
import VehicleGridClient from './VehicleGridClient';

export const dynamic = 'force-dynamic';

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let inventory = await fetchCatalog().catch(() => []);

  // Parse filters
  const statuses = [searchParams.status].flat().filter(Boolean) as string[];
  const makes = [searchParams.make].flat().filter(Boolean) as string[];
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : Infinity;

  // Apply filters
  if (statuses.length > 0) {
    inventory = inventory.filter((v: any) => statuses.includes(v.status));
  }
  if (makes.length > 0) {
    inventory = inventory.filter((v: any) => makes.includes(v.make));
  }
  if (maxPrice !== Infinity) {
    inventory = inventory.filter((v: any) => Number(v.price) <= maxPrice);
  }

  // Pre-resolve URLs on the server to avoid passing functions to the Client Component
  const displayInventory = inventory.map((v: any) => ({
    ...v,
    resolvedImageUrl: resolveImageUrl(v.imageUrl)
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* ═══ SECTION HEADER ═══ */}
      <div className="mb-8 flex justify-between items-end border-b border-surfaceBorder pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text font-grotesk uppercase">
            Asset Collection
          </h1>
          <p className="text-textMuted font-mono text-xs mt-1 uppercase tracking-widest">
            {displayInventory.length} units matching criteria
          </p>
        </div>
        <span className="flex items-center gap-2 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          DATABASE SYNCED
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ═══ SIDEBAR FILTERS ═══ */}
        <FilterSidebar />

        {/* ═══ VEHICLE GRID (Animated) ═══ */}
        <VehicleGridClient inventory={displayInventory} />
      </div>
    </div>
  );
}
