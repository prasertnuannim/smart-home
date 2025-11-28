"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState({ ch1: false });
  const [minutes, setMinutes] = useState(1);

  // ★ Alert system
  const [alert, setAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  function showAlert(type: "success" | "error", msg: string) {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3000);
  }

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Fetch the current state of the relay from the server and update the component state.
 */
/*******  2f21fa87-9089-40e5-8840-e3332d6bb7af  *******/
  async function fetchState() {
    const res = await fetch("/api/relay/status");
    const data = await res.json();
    setState({ ch1: data.ch1 });
  }

  async function toggleNow() {
    try {
      const newVal = !state.ch1;
      await fetch("/api/relay/set", {
        method: "POST",
        body: JSON.stringify({ ch1: newVal }),
      });
      fetchState();
      showAlert("success", "เปลี่ยนสถานะเรียบร้อย");
    } catch {
      showAlert("error", "เกิดข้อผิดพลาด");
    }
  }

  async function setTimer() {
    try {
      await fetch("/api/relay/schedule", {
        method: "POST",
        body: JSON.stringify({
          target: !state.ch1,
          delay: minutes * 60,
        }),
      });
      showAlert("success", `ตั้งเวลา ${minutes} นาทีสำเร็จ`);
    } catch {
      showAlert("error", "ตั้งเวลาไม่สำเร็จ");
    }
  }

  useEffect(() => {
    let cancelled = false;

    const update = async () => {
      const res = await fetch("/api/relay/status");
      const data = await res.json();
      if (!cancelled) {
        setState({ ch1: data.ch1 });
      }
    };

    update();
    const t = setInterval(update, 30000);

    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 400,
        margin: "0 auto",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Relay Control</h1>

      {/* ★ ALERT POPUP (Bottom Toast) */}
      {alert && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "15px 20px",
            background: alert.type === "success" ? "#16a34a" : "#dc2626",
            color: "white",
            borderRadius: 12,
            fontSize: 18,
            zIndex: 999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            maxWidth: "90%",
            textAlign: "center",
          }}
        >
          {alert.msg}
        </div>
      )}

      {/* ปุ่ม toggle */}
      <button
        onClick={toggleNow}
        style={{
          padding: "20px 35px",
          width: "100%",
          fontSize: 26,
          background: state.ch1 ? "#16a34a" : "#737373",
          color: "white",
          border: "none",
          borderRadius: 12,
          cursor: "pointer",
          marginTop: 20,
        }}
      >
        {state.ch1 ? "ON" : "OFF"}
      </button>

      <div style={{ marginTop: 40, textAlign: "center" }}>
        <h3 style={{ marginBottom: 10 }}>ตั้งเวลา (นาที)</h3>

        <input
          type="number"
          min={1}
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          style={{
            padding: 15,
            width: "100%",
            fontSize: 22,
            borderRadius: 10,
            border: "1px solid #ccc",
            textAlign: "center",
            marginBottom: 15,
          }}
        />

        <button
          onClick={setTimer}
          style={{
            width: "100%",
            padding: "15px 20px",
            fontSize: 22,
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          ตั้งเวลาเปลี่ยนสถานะ
        </button>
      </div>
    </div>
  );
}
