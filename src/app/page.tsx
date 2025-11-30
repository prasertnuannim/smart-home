"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-semibold tracking-tight">Smart Home</h1>
        <p className="text-lg text-slate-300">
          จัดการบ้านอัจฉริยะของคุณได้ในที่เดียว
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
