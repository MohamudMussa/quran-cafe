import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

const PrayerTime = ({ longitude, latitude, handleGetLocation }) => {
  const [data, setData] = useState(null);

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
              Object.keys(data).map((key, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-400 glassmorphism text-black"
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
      </div>
    </div>
  );
};

export default PrayerTime;
