"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { geoNaturalEarth1 } from "d3-geo";
import type { Dataset } from "@/data/mock-data";
import { bucketClass, getYearSlice, quantizeBucket } from "@/data/data-utils";

type WorldMapProps = {
  dataset: Dataset;
  year: number;
  onSelectCountry?: (payload: { code: string | null; name?: string | null }) => void;
};

type Feature = {
  type: string;
  id?: string | number;
  properties?: Record<string, unknown> & { "ISO3166-1-Alpha-2"?: string; name?: string };
  geometry: GeoJSON.Geometry;
};

export default function WorldMap({ dataset, year, onSelectCountry }: WorldMapProps) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadGeo() {
      setLoading(true);
      try {
        // Use a lightweight world map if available; placeholder path under public
        const res = await fetch("/data/countries.geojson");
        const gj = await res.json();
        if (!isMounted) return;
        const feats = (gj.features ?? []) as Feature[];
        setFeatures(feats);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadGeo();
    return () => {
      isMounted = false;
    };
  }, []);

  const projection = useMemo(() => geoNaturalEarth1().rotate([0, 0]).precision(0.1), []);
  const path = useMemo(() => d3.geoPath(projection as d3.GeoProjection), [projection]);

  const { byCode, min, max } = useMemo(() => getYearSlice(dataset, year), [dataset, year]);

  type AnimeInstance = ((opts: Record<string, unknown>) => unknown) & {
    stagger: (n: number) => (el: unknown, i: number) => number;
  };
  const animeRef = useRef<AnimeInstance | null>(null);
  useEffect(() => {
    let mounted = true;
    import("animejs")
      .then((mod) => {
        if (!mounted) return;
        const ns = mod as unknown as { default?: unknown };
        const maybeFn = (ns && ns.default !== undefined ? ns.default : (mod as unknown)) as unknown;
        if (typeof maybeFn === "function") {
          const animeFn = maybeFn as AnimeInstance & { stagger?: unknown };
          if (typeof animeFn.stagger !== "function") {
            (animeFn as AnimeInstance).stagger = (n: number) => (_el: unknown, i: number) => i * n;
          }
          animeRef.current = animeFn as AnimeInstance;
        } else {
          animeRef.current = null;
        }
      })
      .catch(() => {
        animeRef.current = null;
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    // Entrance animation when features first render or dataset changes
    if (!svgRef.current) return;
    const anime = animeRef.current;
    const paths = svgRef.current.querySelectorAll(".country-path");
    if (!anime || !paths.length) return;
    anime({ targets: Array.from(paths) as unknown as Element[], opacity: [0, 1], delay: anime.stagger(50), duration: 600, easing: "easeOutQuad" });
  }, [features]);

  useEffect(() => {
    // Color morph on dataset/year change
    if (!svgRef.current) return;
    const anime = animeRef.current;
    if (!anime) return;
    const nodes = Array.from(svgRef.current.querySelectorAll<SVGPathElement>(".country-path"));
    anime({
      targets: nodes,
      duration: 800,
      delay: anime.stagger(20),
      easing: "easeOutExpo",
      // Anime.js cannot tween class directly; we update 'fill' attribute directly per bucket
      fill: (_el: SVGPathElement, i: number) => {
        const f = features[i];
        const code = (f?.properties?.ISO_A2 as string) || "";
        const value = byCode.get(code);
        const bucket = value == null ? 0 : quantizeBucket(value, min, max);
        switch (bucket) {
          case 1:
            return getComputedStyle(document.documentElement).getPropertyValue("--choropleth-low");
          case 2:
            return getComputedStyle(document.documentElement).getPropertyValue("--choropleth-mid");
          case 3:
            return getComputedStyle(document.documentElement).getPropertyValue("--choropleth-high");
          case 4:
            return getComputedStyle(document.documentElement).getPropertyValue("--choropleth-extreme");
          default:
            return getComputedStyle(document.documentElement).getPropertyValue("--choropleth-low");
        }
      },
    });
  }, [dataset, year, features, byCode, min, max]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-[color:var(--text-secondary)]">
        Loading map…
      </div>
    );
  }

  const viewBox = [0, 0, 960, 500] as const;

  return (
    <div className="w-full">
      <svg ref={svgRef} viewBox={viewBox.join(" ")} className="w-full h-auto">
        <g>
          {features.map((f, idx) => {
            const code = (f?.properties?.["ISO3166-1-Alpha-2"] as string) || "";
            const name = (f?.properties?.name as string) || null;
            const value = byCode.get(code);
            const bucket = value == null ? 0 : quantizeBucket(value, min, max);
            const d = path(f as unknown as GeoJSON.Feature<GeoJSON.Geometry, Record<string, unknown>>) || undefined;
            const className = `country-path ${bucket ? bucketClass(bucket) : ""}`.trim();
            return (
              <path
                key={idx}
                d={d}
                className={className}
                onClick={() => onSelectCountry?.({ code: code || null, name })}
                onMouseEnter={() => onSelectCountry?.({ code: code || null, name })}
                onMouseLeave={() => onSelectCountry?.({ code: null, name: null })}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

