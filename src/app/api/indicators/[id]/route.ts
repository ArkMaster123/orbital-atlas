import { NextResponse } from "next/server";

// Map our dataset ids to World Bank indicator codes
const INDICATOR_CODE: Record<string, string> = {
  population: "SP.POP.TOTL",
  gdp: "NY.GDP.PCAP.CD",
  emissions: "EN.ATM.CO2E.PC",
  lifeExpectancy: "SP.DYN.LE00.IN",
};

type WorldBankRecord = {
  country: { id: string; value: string };
  date: string; // year as string
  value: number | null;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = decodeURIComponent(parts[parts.length - 2] === "[id]" ? parts[parts.length - 1] : parts[parts.length - 1]);
    const year = url.searchParams.get("year") ?? "2024";

    const code = INDICATOR_CODE[id];
    if (!code) {
      return NextResponse.json({ error: "Unknown indicator id" }, { status: 404 });
    }

    const wbUrl = `https://api.worldbank.org/v2/country/all/indicator/${code}?format=json&per_page=20000&date=${year}:${year}`;
    const res = await fetch(wbUrl, { next: { revalidate: 60 * 60 * 24 } }); // revalidate daily
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
    const json = (await res.json()) as [unknown, WorldBankRecord[]];
    const records = Array.isArray(json?.[1]) ? (json[1] as WorldBankRecord[]) : [];

    // Filter out aggregates (World, regions) and nulls. Keep ISO2 country codes (A-Z letters, length 2)
    const data = records
      .filter((r) => r.value != null)
      .filter((r) => /^[A-Z]{2}$/i.test(r.country.id))
      .map((r) => ({
        countryCode: r.country.id.toUpperCase(),
        countryName: r.country.value,
        year: Number(r.date),
        value: Number(r.value),
      }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

