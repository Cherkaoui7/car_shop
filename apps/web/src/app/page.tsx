import { fetchCatalog } from '@carshop/api-client';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const inventory = await fetchCatalog().catch(() => []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-slate-200 pb-5 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Aurora Command Center</h1>
          <p className="text-slate-500 mt-1">Live Relational Vehicle Terminal</p>
        </div>
        <span className="text-xs font-mono bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full border border-blue-200">SYSTEM ONLINE</span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {inventory.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl border-2 border-dashed border-slate-300 bg-white">
            <p className="text-red-500 font-mono text-sm">[NO_DATA_RETRIEVED]: Verify API Gateway is running.</p>
          </div>
        ) : (
          inventory.map((vehicle: any) => (
            <Link key={vehicle.id} href={`/inventory/${vehicle.id}`} className="block group">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group-hover:border-blue-500 transition h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{vehicle.vin}</span>
                    <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-green-100 text-green-700">{vehicle.status}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-3">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
                  <p className="text-slate-500 text-sm mt-1 capitalize">{vehicle.exteriorColor} • {vehicle.mileage.toLocaleString()} km</p>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">{Number(vehicle.price).toLocaleString('en-US', { style: 'currency', currency: 'MAD' })}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm group-hover:bg-blue-800">VIEW</button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
