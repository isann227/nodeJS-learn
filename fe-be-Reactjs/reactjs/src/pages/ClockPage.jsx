import React, { useState, useEffect } from "react";

export default function RealTimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update setiap 1 detik
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup saat komponen unmount
    return () => clearInterval(timer);
  }, []);

  // Format jam: HH:MM:SS
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="text-center mt-10 text-2xl font-bold">
      Real-Time Clock
      <p className="mt-2">{formatTime(time)}</p>
    </div>
  );
}
