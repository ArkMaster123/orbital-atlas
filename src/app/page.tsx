"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Globe from "@/components/globe";
import DataPanel from "@/components/data-panel";
import { DATASETS, DEFAULT_YEAR } from "@/data/mock-data";
import { getYearSlice } from "@/data/data-utils";

export default function Home() {
  const [datasetId, setDatasetId] = useState<keyof typeof DATASETS>("population");
  const [year] = useState(DEFAULT_YEAR);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [randomStats, setRandomStats] = useState<{ label: string; value: string }[] | null>(null);

  const dataset = DATASETS[datasetId];
  // Prefer live data if available
  const [liveByCode, setLiveByCode] = useState<Map<string, number> | null>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/indicators/${datasetId}?year=${year}`);
        if (!res.ok) return;
        const json = await res.json();
        const map = new Map<string, number>();
        for (const d of json.data as { countryCode: string; value: number }[]) {
          map.set(d.countryCode, d.value);
        }
        if (mounted) setLiveByCode(map);
      } catch (_) {
        if (mounted) setLiveByCode(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [datasetId, year]);

  const slice = useMemo(() => {
    if (liveByCode && liveByCode.size > 0) {
      const values = Array.from(liveByCode.values());
      const min = Math.min(...values);
      const max = Math.max(...values);
      return { byCode: liveByCode, min, max } as ReturnType<typeof getYearSlice>;
    }
    return getYearSlice(dataset, year);
  }, [dataset, year, liveByCode]);
  const globalAvg = useMemo(() => {
    const vals = Array.from(slice.byCode.values());
    if (!vals.length) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }, [slice]);

  const selectedLabel = selectedCode ?? "—";
  const selectedValue = selectedCode ? slice.byCode.get(selectedCode) ?? null : null;

  function generateRandomStats() {
    const rnd = (min: number, max: number) => Math.random() * (max - min) + min;
    const int = (min: number, max: number) => Math.round(rnd(min, max));
    const pct = () => `${int(0, 100)}%`;
    const money = () => `$${int(1, 500)}B`;
    const people = () => `${int(1, 150)}M`;
    return [
      { label: "Growth", value: pct() },
      { label: "Budget", value: money() },
      { label: "Population", value: people() },
      { label: "Score", value: `${int(0, 100)}/100` },
    ];
  }

  function handleSelect(payload: { code: string | null; name?: string | null }) {
    const { code, name } = payload;
    setSelectedCode(code);
    setSelectedName(name ?? null);
    if (code) setRandomStats(generateRandomStats());
  }

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-[color:var(--text-primary)]">Orbital</span>
            <span className="text-[color:var(--accent-blue)]">Atlas</span>
          </h1>
          <nav className="flex items-center gap-4">
            <Link 
              href="/about" 
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              About
            </Link>
            <a 
              href="https://github.com/ArkMaster123/orbital-atlas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.bornandbrand.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[color:var(--accent-blue)] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Born & Brand
            </a>
          </nav>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[18rem_1fr_20rem] gap-6">
      <DataPanel
        datasets={DATASETS}
        activeId={datasetId}
        onChange={(id) => setDatasetId(id as keyof typeof DATASETS)}
        globalAvg={Math.round(globalAvg)}
        selectedLabel={selectedName ?? selectedLabel}
        selectedValue={selectedValue == null ? null : Math.round(selectedValue)}
        randomStats={randomStats}
      />
      <div className="rounded-lg border border-white/10 p-2 bg-[color:var(--bg-secondary)]">
        <Globe dataset={dataset} year={year} slice={slice} onSelectCountry={handleSelect} />
      </div>
      {/* Right stats sidebar */}
      <aside className="hidden lg:block rounded-lg border border-white/10 p-4 bg-[color:var(--bg-secondary)]">
        <h3 className="text-base font-semibold mb-2">Country</h3>
        <div className="grid gap-2 text-[13px]">
          <div className="flex justify-between"><span className="text-[color:var(--text-secondary)]">Name</span><span>{selectedName ?? "—"}</span></div>
          <div className="flex justify-between"><span className="text-[color:var(--text-secondary)]">Code</span><span>{selectedCode ?? "—"}</span></div>
        </div>
        {randomStats && (
          <div className="mt-4">
            <h4 className="text-base font-semibold mb-2">Random Stats</h4>
            <div className="grid gap-2 text-[13px]">
              {randomStats.map((s, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-[color:var(--text-secondary)]">{s.label}</span>
                  <span>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
      </main>
    </div>
  );
}
