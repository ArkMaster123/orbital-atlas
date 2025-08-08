export interface DataPoint {
  countryCode: string; // ISO 3166-1 alpha-2
  countryName: string;
  year: number;
  value: number;
  rank?: number;
}

export interface Dataset {
  id: string;
  name: string;
  unit: string;
  description: string;
  source: string;
  color: string;
  data: DataPoint[];
}

const years = [2020, 2021, 2022, 2023, 2024];

function series(
  code: string,
  name: string,
  values: number[]
): DataPoint[] {
  return years.map((year, i) => ({ countryCode: code, countryName: name, year, value: values[i] ?? values[values.length - 1] }));
}

export const DATASETS: Record<string, Dataset> = {
  population: {
    id: "population",
    name: "Population",
    unit: "people",
    description: "Total population (mock)",
    source: "Mock",
    color: "#06b6d4",
    data: [
      ...series("US", "United States", [331e6, 333e6, 334e6, 336e6, 338e6]),
      ...series("CN", "China", [1402e6, 1410e6, 1412e6, 1411e6, 1409e6]),
      ...series("IN", "India", [1380e6, 1393e6, 1408e6, 1420e6, 1435e6]),
      ...series("BR", "Brazil", [213e6, 214e6, 215e6, 216e6, 217e6]),
      ...series("RU", "Russia", [146e6, 145e6, 144e6, 144e6, 143e6]),
      ...series("ZA", "South Africa", [60e6, 61e6, 61.5e6, 62e6, 62.5e6]),
      ...series("GB", "United Kingdom", [67e6, 67.5e6, 68e6, 68.2e6, 68.5e6])
    ],
  },
  gdp: {
    id: "gdp",
    name: "GDP Per Capita",
    unit: "USD",
    description: "GDP per capita (mock)",
    source: "Mock",
    color: "#10b981",
    data: [
      ...series("US", "United States", [65000, 67000, 69000, 72000, 74000]),
      ...series("CN", "China", [10000, 11000, 12000, 13000, 14000]),
      ...series("IN", "India", [2200, 2400, 2600, 2800, 3000]),
      ...series("BR", "Brazil", [9000, 9500, 10000, 10500, 11000]),
      ...series("RU", "Russia", [11500, 11000, 10500, 10000, 9500]),
      ...series("ZA", "South Africa", [6000, 6200, 6400, 6600, 6800]),
      ...series("GB", "United Kingdom", [43000, 44000, 45500, 47000, 48500])
    ],
  },
  emissions: {
    id: "emissions",
    name: "CO2 Emissions",
    unit: "tons per capita",
    description: "Per-capita CO2 (mock)",
    source: "Mock",
    color: "#ef4444",
    data: [
      ...series("US", "United States", [15, 15.2, 15.4, 15.1, 14.9]),
      ...series("CN", "China", [8.2, 8.5, 8.7, 8.6, 8.4]),
      ...series("IN", "India", [2.0, 2.1, 2.2, 2.3, 2.4]),
      ...series("BR", "Brazil", [2.3, 2.4, 2.5, 2.5, 2.6]),
      ...series("RU", "Russia", [11, 10.8, 10.5, 10.2, 10.0]),
      ...series("ZA", "South Africa", [7.5, 7.4, 7.3, 7.2, 7.1]),
      ...series("GB", "United Kingdom", [5.3, 5.2, 5.1, 5.0, 4.9])
    ],
  },
  lifeExpectancy: {
    id: "lifeExpectancy",
    name: "Life Expectancy",
    unit: "years",
    description: "Life expectancy at birth (mock)",
    source: "Mock",
    color: "#8b5cf6",
    data: [
      ...series("US", "United States", [78.8, 78.5, 78.8, 79.0, 79.2]),
      ...series("CN", "China", [77.3, 77.6, 78.0, 78.2, 78.5]),
      ...series("IN", "India", [69.7, 70.0, 70.3, 70.6, 70.9]),
      ...series("BR", "Brazil", [75.5, 75.6, 75.8, 76.0, 76.2]),
      ...series("RU", "Russia", [72.7, 72.4, 72.6, 72.8, 73.0]),
      ...series("ZA", "South Africa", [64.1, 64.5, 64.8, 65.1, 65.4]),
      ...series("GB", "United Kingdom", [80.9, 81.1, 81.3, 81.5, 81.7])
    ],
  },
};

export const DEFAULT_YEAR = 2024;
export const YEARS = years;
