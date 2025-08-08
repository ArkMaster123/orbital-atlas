"use client";
import { clsx } from "clsx";
import type { Dataset } from "@/data/mock-data";

type DataPanelProps = {
  datasets: Record<string, Dataset>;
  activeId: string;
  onChange: (id: string) => void;
  globalAvg?: number;
  selectedLabel?: string;
  selectedValue?: number | null;
  randomStats?: { label: string; value: string }[] | null;
};

export default function DataPanel({ datasets, activeId, onChange, globalAvg, selectedLabel, selectedValue, randomStats }: DataPanelProps) {
  const entries = Object.entries(datasets);
  return (
    <aside className="data-panel p-4 sm:p-6 text-sm w-full sm:w-72">
      <h2 className="text-base font-semibold mb-3">📊 Datasets</h2>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {entries.map(([id, ds]) => (
          <button
            key={id}
            className={clsx(
              "dataset-button rounded px-3 py-2 text-left",
              id === activeId && "ring-2 ring-[color:var(--accent-blue)]"
            )}
            onClick={() => onChange(id)}
          >
            <div className="text-[color:var(--text-primary)]">{ds.name}</div>
            <div className="text-[10px] text-[color:var(--text-secondary)]">{ds.unit}</div>
          </button>
        ))}
      </div>

      <h3 className="text-base font-semibold mb-2">📈 Live Stats</h3>
      <div className="grid gap-2 text-[13px]">
        <div className="flex justify-between"><span className="text-[color:var(--text-secondary)]">Global Avg</span><span>{globalAvg?.toLocaleString?.() ?? "—"}</span></div>
        <div className="flex justify-between"><span className="text-[color:var(--text-secondary)]">Selected</span><span>{selectedLabel ?? "—"}</span></div>
        <div className="flex justify-between"><span className="text-[color:var(--text-secondary)]">Value</span><span>{selectedValue == null ? "—" : selectedValue.toLocaleString?.()}</span></div>
      </div>

      {randomStats && (
        <div className="mt-4">
          <h4 className="text-base font-semibold mb-2">🎲 Random Stats</h4>
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
  );
}

