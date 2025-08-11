import React, { useEffect, useMemo, useState } from "react";

const ORDERED_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Sunset", "Maghrib", "Isha"]; // keep order

function toMinutes(val) {
  if (!val) return 0;
  const m = String(val).match(/(\d{1,2}):(\d{2})(?:\s*(AM|PM))?/i);
  if (!m) return 0;
  let hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const ampm = m[3]?.toUpperCase();
  if (ampm === 'PM' && hh < 12) hh += 12;
  if (ampm === 'AM' && hh === 12) hh = 0;
  return (hh % 24) * 60 + (mm % 60);
}

function formatHMS(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const two = (n) => String(n).padStart(2, "0");
  return `${two(h)}:${two(m)}:${two(ss)}`;
}

const NextCountdown = ({ timings }) => {
  const ordered = useMemo(() => {
    if (!timings) return [];
    return ORDERED_KEYS.filter((k) => timings[k]).map((k) => ({ key: k, minutes: toMinutes(timings[k]) }));
  }, [timings]);

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { label, remainingSec } = useMemo(() => {
    if (!ordered.length) return { label: "-", remainingSec: 0 };
    const nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    let nextIndex = 0;
    for (let i = 0; i < ordered.length; i++) {
      if (nowMinutes < ordered[i].minutes) { nextIndex = i; break; }
      nextIndex = 0; // default to first of next day
    }
    const next = ordered[nextIndex].minutes;
    const currInMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    let diffMin = next - currInMin;
    if (diffMin < 0) diffMin += 24 * 60; // wrap
    return { label: ordered[nextIndex].key, remainingSec: diffMin * 60 };
  }, [ordered, now]);

  return (
    <div className="w-full mt-3">
      <div className="panel-header px-3 py-2 text-sm uppercase tracking-wide">Next Prayer</div>
      <div className="w-full h-20 flex items-center justify-between px-4" style={{ backgroundColor: "#ffa700", color: "#000" }}>
        <div className="font-extrabold text-lg">{label}</div>
        <div className="font-black text-2xl">{formatHMS(remainingSec)}</div>
      </div>
    </div>
  );
};

export default NextCountdown;