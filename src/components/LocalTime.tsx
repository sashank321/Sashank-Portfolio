import { useEffect, useState } from "react";

export default function LocalTime() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
      setTimeStr(`${formatted} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[10px] font-medium text-[#D7E2EA] uppercase tracking-widest block tabular-nums">
      {timeStr || "LOADING..."}
    </span>
  );
}
