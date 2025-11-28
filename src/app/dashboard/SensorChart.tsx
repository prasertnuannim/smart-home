"use client";

import { Line } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import type { SensorReading } from "@/server/domain/sensorReading.entity";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

type SensorReadingDto = Omit<SensorReading, "createdAt"> & { createdAt: string };

interface SensorChartProps {
  deviceId: string;
  hours?: number;
  refreshMs?: number;
  initialData?: SensorReading[];
}

type RangeBand = { from: number; to: number; color: string };

const createHighlightPlugin = (ranges: RangeBand[]): Plugin<"line"> => ({
  id: "highlightBand",
  beforeDraw: (chart) => {
    if (!ranges.length) return;
    const {
      ctx,
      chartArea: { left, right, top, bottom },
      scales: { y },
    } = chart;
    ctx.save();
    ranges.forEach((range) => {
      const yTop = y.getPixelForValue(range.to);
      const yBottom = y.getPixelForValue(range.from);
      ctx.fillStyle = range.color;
      ctx.fillRect(left, yTop, right - left, yBottom - yTop);
    });
    ctx.restore();
  },
});

const baseOptions: ChartOptions<"line"> = {
  plugins: {
    legend: {
      display: true,
      labels: { color: "#0f172a" },
    },
  },
  scales: {
    x: {
      ticks: { color: "#475569" },
      grid: { display: false },
    },
    y: {
      ticks: { color: "#475569" },
      grid: { color: "rgba(148, 163, 184, 0.3)" },
    },
  },
  maintainAspectRatio: false,
};

export default function SensorChart({
  deviceId,
  hours = 24,
  refreshMs = 30000,
  initialData = [],
}: SensorChartProps) {
  const [data, setData] = useState<SensorReading[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchHistory = async (showLoading = true) => {
      if (showLoading) setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/sensors/history?deviceId=${encodeURIComponent(deviceId)}&hours=${hours}`
        );
        const payload = await res.json();
        if (!payload.ok) {
          throw new Error(payload.error ?? "Failed to load sensor data");
        }
        const readings = (payload.data as SensorReadingDto[]).map((d) => ({
          ...d,
          createdAt: new Date(d.createdAt),
        }));
        if (!cancelled) {
          setData(readings);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load sensor data";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    // initial load
    fetchHistory(data.length === 0);

    // periodic refresh
    const interval = setInterval(() => fetchHistory(false), refreshMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [deviceId, hours, refreshMs]);

  const labels = useMemo(
    () =>
      data.map((d) =>
        new Date(d.createdAt).toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
    [data]
  );

  const co2Data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "CO₂ (ppm)",
          data: data.map((d) => d.co2),
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          tension: 0.35,
        },
      ],
    }),
    [data, labels]
  );

  const temperatureData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: data.map((d) => d.temperature),
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.15)",
          tension: 0.35,
        },
      ],
    }),
    [data, labels]
  );

  const humidityData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Humidity (%)",
          data: data.map((d) => d.humidity),
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          tension: 0.35,
        },
      ],
    }),
    [data, labels]
  );

  const temperatureHighlight = useMemo(
    () => createHighlightPlugin([{ from: 22, to: 28, color: "rgba(59, 130, 246, 0.08)" }]),
    []
  );

  const humidityHighlight = useMemo(
    () => createHighlightPlugin([{ from: 40, to: 60, color: "rgba(16, 185, 129, 0.08)" }]),
    []
  );

  if (loading) {
    return <p>Loading sensor data...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 10, height: 260 }}>
        <Line data={co2Data} options={baseOptions} />
      </div>
      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 10, height: 260 }}>
        <Line data={temperatureData} options={baseOptions} plugins={[temperatureHighlight]} />
      </div>
      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 10, height: 260 }}>
        <Line data={humidityData} options={baseOptions} plugins={[humidityHighlight]} />
      </div>
    </div>
  );
}
