import React, { useEffect, useState, useMemo } from "react";
import { FaLocationDot } from "react-icons/fa6";
import NextCountdown from "./NextCountdown";

const ORDERED_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Sunset", "Maghrib", "Isha"]; // keep order consistent

function parseToMinutesFlexible(val) {
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

const PrayerTime = ({ longitude, latitude, handleGetLocation }) => {
  const [data, setData] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);

  useEffect(() => {
    if (!data && longitude && latitude) {
      let dateToday = new Date();
      let dd = String(dateToday.getDate()).padStart(2, "0");
      let mm = String(dateToday.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = dateToday.getFullYear();
      dateToday = dd + "-" + mm + "-" + yyyy;

      fetch(
        `https://api.aladhan.com/v1/timings/${dateToday}?latitude=${latitude}&longitude=${longitude}&method=2`
      ).then((res) => {
        res.json().then((data) => {
          setData(data.data.timings);
          console.log("Data ::: ", data.data.timings);
        });
      });
    }
  }, [longitude, data, latitude]);

  // Prepare ordered list of available keys
  const ordered = useMemo(() => {
    if (!data) return [];
    return ORDERED_KEYS.filter((k) => data[k]).map((k) => ({ key: k, minutes: parseToMinutesFlexible(data[k]) }));
  }, [data]);

  // Determine the current active prayer window
  useEffect(() => {
    if (!ordered.length) return;

    const computeActive = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      for (let i = 0; i < ordered.length; i++) {
        const curr = ordered[i].minutes;
        const next = i < ordered.length - 1 ? ordered[i + 1].minutes : ordered[0].minutes + 24 * 60;
        if (nowMinutes >= curr && nowMinutes < next) {
          setCurrentKey(ordered[i].key);
          return;
        }
      }
      setCurrentKey(ordered[ordered.length - 1].key);
    };

    computeActive();
    const id = setInterval(computeActive, 60 * 1000);
    return () => clearInterval(id);
  }, [ordered]);

  return (
    <div className="relative overflow-hidden sm:rounded-lg">
      <div className="panel-header px-3 py-2 text-sm uppercase tracking-wide">Prayer Times</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left ">
          <thead className="b">
            <tr className="border-b border-gray-200 text-left bg-black text-white">
              <th className="px-2 py-2 text-lg font-bold">Prayer</th>
              <th className="px-2 py-2 text-lg font-bold">Time</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              Object.keys(data).filter((k) => ORDERED_KEYS.includes(k)).map((key, index) => {
                const isActive = key === currentKey;
                return (
                  <tr
                    key={index}
                    className={`border-b border-gray-400 ${isActive ? "" : "glassmorphism text-black"}`}
                    style={isActive ? { backgroundColor: "#ffa700", color: "#000" } : {}}
                  >
                    <td className="px-2 py-1 font-semibold">{key}</td>
                    <td className="px-2 py-1 font-bold">{data[key]}</td>
                  </tr>
                );
              })
            ) : (
              <button onClick={handleGetLocation} className="text-center w-full py-3 text-lg font-bold flex justify-center items-center">
                {" "}
                <FaLocationDot  /> <span className="pl-1">Need permission</span>
              </button>
            )}
          </tbody>
        </table>
        {data && <NextCountdown timings={data} />}
      </div>
    </div>
  );
};

export default PrayerTime;
