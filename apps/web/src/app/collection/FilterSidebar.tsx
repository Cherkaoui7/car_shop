'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial state from URL
  const initialStatuses = searchParams.getAll('status');
  const initialMakes = searchParams.getAll('make');
  const initialMaxPrice = searchParams.get('maxPrice') || '1000000';

  const [statuses, setStatuses] = useState<string[]>(initialStatuses.length > 0 ? initialStatuses : ['AVAILABLE', 'PENDING_RESERVATION']);
  const [makes, setMakes] = useState<string[]>(initialMakes);
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice);

  const handleStatusToggle = (status: string) => {
    setStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };

  const handleMakeToggle = (make: string) => {
    setMakes(prev => prev.includes(make) ? prev.filter(m => m !== make) : [...prev, make]);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    statuses.forEach(s => params.append('status', s));
    makes.forEach(m => params.append('make', m));
    params.set('maxPrice', maxPrice);

    router.push(`/collection?${params.toString()}`);
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 glass-panel p-5 sticky top-[95px]">
      <h2 className="text-primary font-bold font-grotesk text-lg mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
        </svg>
        DATA FILTERS
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-mono font-bold text-textMuted mb-3 tracking-widest">STATUS</h3>
          <div className="space-y-2 font-mono text-xs">
            {['AVAILABLE', 'PENDING_RESERVATION', 'SOLD'].map(status => (
              <label key={status} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={statuses.includes(status)}
                  onChange={() => handleStatusToggle(status)}
                  className="w-4 h-4 rounded border-surfaceBorder bg-slate-900 text-primary focus:ring-primary/50 focus:ring-offset-0" 
                />
                <span className="text-textDim group-hover:text-text transition">{status}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-surfaceBorder">
          <h3 className="text-xs font-mono font-bold text-textMuted mb-3 tracking-widest">MANUFACTURER</h3>
          <div className="space-y-2 font-mono text-xs">
            {['BMW', 'Honda', 'Lamborghini', 'Porsche', 'Tesla'].map(make => (
              <label key={make} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={makes.includes(make)}
                  onChange={() => handleMakeToggle(make)}
                  className="w-4 h-4 rounded border-surfaceBorder bg-slate-900 text-primary focus:ring-primary/50 focus:ring-offset-0" 
                />
                <span className="text-textDim group-hover:text-text transition">{make}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-surfaceBorder">
          <h3 className="text-xs font-mono font-bold text-textMuted mb-3 tracking-widest flex justify-between">
            <span>MAX VALUATION</span>
            <span className="text-primary">MAD {Number(maxPrice).toLocaleString('en-US')}</span>
          </h3>
          <input 
            type="range" 
            min="0" 
            max="2000000" 
            step="50000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full accent-primary bg-slate-900 rounded-lg appearance-none h-1.5 mt-2" 
          />
        </div>

        <button 
          onClick={applyFilters}
          className="w-full mt-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-lg text-xs font-mono font-bold transition"
        >
          APPLY FILTERS
        </button>
      </div>
    </aside>
  );
}
