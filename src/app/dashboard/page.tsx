"use client";

import { useEffect, useState } from "react";
import { getSensorData } from "./actions";
import { FilterTabs } from "./components/FilterTabs";
import { TripleChart } from "./components/TripleChart";
import { StatCard } from "./components/StatCard";
import { DashboardRange, DashboardReading } from "@/types/dashboard";

export default function DashboardPage() {
  const [range, setRange] = useState<DashboardRange>("day");
  const [data, setData] = useState<DashboardReading[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const rows = await getSensorData(range);
      if (!cancelled) setData(rows);
    };

    load();
    const interval = setInterval(load, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [range]);

  const latest = data.at(-1);
  const isTemperatureNormal = latest ? latest.temperature >= 24 && latest.temperature <= 29 : true;
  const isHumidityNormal = latest ? latest.humidity >= 45 && latest.humidity <= 60 : true;

  const temperatureValue = latest
    ? `${latest.temperature} ${isTemperatureNormal ? "(ปกติ)" : "(ผิดปกติ)"}`
    : "--";

  const humidityValue = latest
    ? `${latest.humidity} ${isHumidityNormal ? "(ปกติ)" : "(ผิดปกติ)"}`
    : "--";

  return (
    <div className="relative min-h-screen px-4 pt-6 pb-20 fade-in">
      
      {/* Floating ambient particles */}
      <div className="particles"></div>

      <h1 className="text-3xl font-semibold tracking-tight mb-6
         text-gray-800 dark:text-gray-100">
        Smart Home Monitor
      </h1>

      <FilterTabs value={range} onChange={setRange} />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StatCard
          title="Temperature (°C)"
          value={temperatureValue}
          color={isTemperatureNormal ? "orange" : "red"}
          delay="100ms"
        />
        <StatCard
          title="Humidity (%)"
          value={humidityValue}
          color={isHumidityNormal ? "blue" : "red"}
          delay="200ms"
        />
      </div>

      {/* Triple Chart */}
      <TripleChart data={data} />

    </div>
  );
}
