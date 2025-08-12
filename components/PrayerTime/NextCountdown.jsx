import React, { useEffect, useMemo, useState } from "react";

const ORDERED_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Sunset", "Maghrib", "Isha"]; // keep order

function parseToDateToday(val) {
  if (!val) return null;
  const m = String(val).match(/(\d{1,2}):(\d{2})(?:\s*(AM|PM))?/i);
  if (!m) return null;
  let hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const ampm = m[3]?.toUpperCase();
  if (ampm === 'PM' && hh < 12) hh += 12;
  if (ampm === 'AM' && hh === 12) hh = 0;
  const d = new Date();
  d.setHours(hh, mm, 0, 0);
  return d;
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
  const schedule = useMemo(() => {
    if (!timings) return [];
    return ORDERED_KEYS
      .filter((k) => timings[k])
      .map((k) => ({ key: k, date: parseToDateToday(timings[k]) }))
      .filter((x) => !!x?.date)
      .sort((a, b) => a.date - b.date);
  }, [timings]);

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { label, remainingSec, nextDate } = useMemo(() => {
    if (!schedule.length) return { label: "-", remainingSec: 0, nextDate: null };
    const nowTs = now.getTime();
    let upcoming = schedule.find((s) => s.date.getTime() > nowTs);
    if (!upcoming) {
      // Next is tomorrow's first prayer
      const first = schedule[0];
      const d = new Date(first.date);
      d.setDate(d.getDate() + 1);
      upcoming = { key: first.key, date: d };
    }
    const diffSec = Math.max(0, Math.floor((upcoming.date.getTime() - nowTs) / 1000));
    return { label: upcoming.key, remainingSec: diffSec, nextDate: upcoming.date };
  }, [schedule, now]);

  const handleFocusUntilSalah = () => {
    const seconds = Math.max(1, Math.floor(remainingSec));
    try {
      window.dispatchEvent(new CustomEvent('focus-until-salah', { detail: { seconds } }));
    } catch {}
  };

  return (
    <div className="w-full mt-3">
      <div className="panel-header px-3 py-2 text-sm uppercase tracking-wide">Next Prayer</div>
      <div className="w-full h-20 flex items-center justify-between px-4" style={{ backgroundColor: "#ffa700", color: "#000" }}>
        <div className="flex items-center space-x-2">
          <div className="font-extrabold text-lg">{label}</div>
          <button onClick={handleFocusUntilSalah} className="px-2 py-1 rounded-md text-xs font-bold border border-black" style={{ backgroundColor: "#000", color: "#ffa700" }}>
            Focus Until Salah
          </button>
        </div>
        <div className="font-black text-2xl">{formatHMS(remainingSec)}</div>
      </div>
    </div>
  );
};

export default NextCountdown;