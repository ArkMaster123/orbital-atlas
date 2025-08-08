"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { geoOrthographic } from "d3-geo";
import type { Dataset } from "@/data/mock-data";
import { bucketClass, getYearSlice, quantizeBucket } from "@/data/data-utils";

type Feature = {
  type: string;
  id?: string | number;
  properties?: Record<string, unknown> & { "ISO3166-1-Alpha-2"?: string; name?: string };
  geometry: GeoJSON.Geometry;
};

type GlobeProps = {
  dataset: Dataset;
  year: number;
  slice?: ReturnType<typeof getYearSlice>;
  onSelectCountry?: (payload: { code: string | null; name?: string | null }) => void;
};

export default function Globe({ dataset, year, slice, onSelectCountry }: GlobeProps) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.2); // Default slow speed
  const animationRef = useRef<number | null>(null);

  // Load GeoJSON
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/data/countries.geojson");
        const gj = await res.json();
        if (!mounted) return;
        setFeatures(((gj?.features ?? []) as Feature[]) || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const { byCode, min, max } = useMemo(() => slice || getYearSlice(dataset, year), [slice, dataset, year]);

  // Projection setup
  const size = 600; // square viewbox for a globe
  const center = useMemo(() => [size / 2, size / 2] as const, [size]);
  const scaleRef = useRef<number>(size * 0.46);
  const rotationRef = useRef<[number, number, number]>([0, -10, 0]); // [lambda, phi, gamma]

  const projection = useMemo(() => {
    return geoOrthographic()
      .translate([center[0], center[1]])
      .scale(scaleRef.current)
      .rotate(rotationRef.current)
      .precision(0.5);
  }, [center]);

  const path = useMemo(() => d3.geoPath(projection as d3.GeoProjection), [projection]);
  const graticule = useMemo(() => d3.geoGraticule10(), []);

  // Re-render helper: update projection with latest refs and trigger a render via state toggler
  const [, setTick] = useState(0);
  const applyProjectionUpdates = useCallback(() => {
    projection.scale(scaleRef.current).rotate(rotationRef.current);
    setTick((t) => t + 1);
  }, [projection]);

  // Auto-rotation animation
  useEffect(() => {
    if (!isAutoRotating) return;

    const animate = () => {
      const [lambda, phi, gamma] = rotationRef.current;
      rotationRef.current = [lambda + rotationSpeed, phi, gamma];
      applyProjectionUpdates();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoRotating, rotationSpeed, applyProjectionUpdates]);

  // Zoom controls
  const zoomIn = useCallback(() => {
    const next = Math.min(size * 0.9, scaleRef.current * 1.2);
    scaleRef.current = next;
    applyProjectionUpdates();
  }, [applyProjectionUpdates, size]);

  const zoomOut = useCallback(() => {
    const next = Math.max(size * 0.25, scaleRef.current * 0.8);
    scaleRef.current = next;
    applyProjectionUpdates();
  }, [applyProjectionUpdates, size]);

  // Wheel to zoom
  const onWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      const factor = delta > 0 ? 0.95 : 1.05;
      const next = Math.max(size * 0.25, Math.min(size * 0.9, scaleRef.current * factor));
      scaleRef.current = next;
      applyProjectionUpdates();
    },
    [applyProjectionUpdates, size]
  );

  // Drag to rotate
  const draggingRef = useRef(false);
  const lastPosRef = useRef<[number, number] | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    setIsAutoRotating(false); // Stop auto-rotation when user starts dragging
    draggingRef.current = true;
    lastPosRef.current = [e.clientX, e.clientY];
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    draggingRef.current = false;
    lastPosRef.current = null;
    // Resume auto-rotation after a delay
    setTimeout(() => {
      if (!draggingRef.current) {
        setIsAutoRotating(true);
      }
    }, 3000); // Resume after 3 seconds of inactivity
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingRef.current || !lastPosRef.current) return;
    const [lx, ly] = lastPosRef.current;
    const dx = e.clientX - lx;
    const dy = e.clientY - ly;
    lastPosRef.current = [e.clientX, e.clientY];
    // Adjust rotation (longitude by dx, latitude by dy)
    const [lambda, phi, gamma] = rotationRef.current;
    const sensitivity = 0.25;
    rotationRef.current = [lambda + dx * sensitivity, phi - dy * sensitivity, gamma];
    applyProjectionUpdates();
  }, [applyProjectionUpdates]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-[color:var(--text-secondary)]">
        Loading globe…
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* Controls Panel */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
        <button
          onClick={zoomIn}
          className="w-10 h-10 bg-[color:var(--bg-secondary)] border border-white/10 rounded-lg flex items-center justify-center text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)] transition-colors"
          title="Zoom In"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
        </button>
        <button
          onClick={zoomOut}
          className="w-10 h-10 bg-[color:var(--bg-secondary)] border border-white/10 rounded-lg flex items-center justify-center text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)] transition-colors"
          title="Zoom Out"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
          </svg>
        </button>
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center transition-colors ${
            isAutoRotating 
              ? 'bg-[color:var(--accent-blue)] text-white' 
              : 'bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)]'
          }`}
          title={isAutoRotating ? "Stop Rotation" : "Start Rotation"}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
          </svg>
        </button>
        
        {/* Speed Control */}
        <div className="bg-[color:var(--bg-secondary)] border border-white/10 rounded-lg p-3 min-w-[140px]">
          <div className="text-xs text-[color:var(--text-secondary)] mb-2 text-center">
            Rotation Speed
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[color:var(--text-secondary)]">🐌</span>
            <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-blue-400 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none"
              title={`Speed: ${(rotationSpeed * 100).toFixed(0)}%`}
            />
            <span className="text-xs text-[color:var(--text-secondary)]">🚀</span>
          </div>
          <div className="text-xs text-[color:var(--text-tertiary)] text-center mt-1">
            {(rotationSpeed * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto touch-pan-y"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        {/* Water sphere */}
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0b1220" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
        </defs>
        <circle cx={center[0]} cy={center[1]} r={scaleRef.current} fill="url(#oceanGrad)" style={{ pointerEvents: "none" }} />

        {/* Graticule */}
        <path d={path(graticule) || undefined} fill="none" stroke="#334155" strokeOpacity={0.5} strokeWidth={0.5} style={{ pointerEvents: "none" }} />

        {/* Countries */}
        <g>
          {features.map((f, idx) => {
            const code = (f?.properties?.["ISO3166-1-Alpha-2"] as string) || "";
            const value = byCode.get(code);
            const bucket = value == null ? 0 : quantizeBucket(value, min, max);
            const d = path(f as unknown as GeoJSON.Feature<GeoJSON.Geometry, Record<string, unknown>>) || undefined;
            const className = `country-path ${bucket ? bucketClass(bucket) : ""}`.trim();
            const name = (f?.properties?.name as string) || null;
            return (
              <path
                key={idx}
                d={d}
                className={className}
                onClick={() => onSelectCountry?.({ code: code || null, name })}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

