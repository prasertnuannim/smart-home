import { SensorReadingRecord } from "./sensorReading";

export type DashboardRange = "day" | "week" | "month";

export type SensorMetricKey = "co2" | "temperature" | "humidity";

export type DashboardReading = Omit<SensorReadingRecord, "createdAt"> & {
  createdAt: string | Date;
};

export interface FilterTabsProps {
  value: DashboardRange;
  onChange: (value: DashboardRange) => void;
}

export interface StatCardProps {
  title: string;
  value: number | string;
  color: "red" | "orange" | "blue";
  delay?: string;
}

export interface ChartWrapperProps {
  data: DashboardReading[];
  label: SensorMetricKey;
}

export interface TripleChartProps {
  data: DashboardReading[];
}
