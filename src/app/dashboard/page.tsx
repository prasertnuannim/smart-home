import SensorChart from "./SensorChart";
import { getSensorReadings } from "./actions";

export const revalidate = 0; // always fetch fresh data

const deviceId = "my-home";
const windowHours = 24 * 30;

export default async function SensorPage() {
  const initialData = await getSensorReadings(deviceId, windowHours);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 20% 20%, #e0f2fe, #f8fafc 45%)",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "18px 20px",
            background: "#0f172a",
            color: "#e2e8f0",
            borderRadius: 16,
            boxShadow: "0 15px 40px rgba(15, 23, 42, 0.25)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 0 6px rgba(34, 197, 94, 0.2)",
                }}
              />
              <p style={{ fontSize: 13, letterSpacing: 0.5, color: "#a5b4fc" }}>
                Live · Device {deviceId}
              </p>
            </div>
            <h1 style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700 }}>
              Air Quality & Comfort
            </h1>
            <p style={{ marginTop: 4, color: "#94a3b8" }}>
              Monitoring CO₂, temperature, and humidity for {deviceId}.
            </p>
          </div>
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(148, 163, 184, 0.15)",
              borderRadius: 12,
              border: "1px solid rgba(148, 163, 184, 0.25)",
              fontSize: 13,
              color: "#cbd5e1",
              textAlign: "right",
              minWidth: 180,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14 }}>{deviceId}</div>
            <div>Last 30 days</div>
            <div style={{ marginTop: 6, color: "#94a3b8" }}>Auto-refresh on load</div>
          </div>
        </header>

        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "18px 18px 10px",
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              gap: 12,
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                Sensor History
              </h2>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>
                CO₂, temperature, and humidity readings ({deviceId})
              </p>
            </div>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                background: "#e0f2fe",
                color: "#075985",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Last 30 days
            </div>
          </div>
            <div style={{ padding: "6px 4px 14px" }}>
              <SensorChart
                deviceId={deviceId}
                hours={windowHours}
                refreshMs={30000}
                initialData={initialData}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
