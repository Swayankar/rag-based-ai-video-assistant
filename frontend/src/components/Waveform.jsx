import React from "react";

const BARS = ["bar1", "bar2", "bar3", "bar4", "bar5", "bar4", "bar3", "bar2", "bar1"];

export default function Waveform({ size = "md", color = "bg-amber" }) {
  const height = size === "sm" ? "h-4" : size === "lg" ? "h-10" : "h-6";
  return (
    <div className={`flex items-center gap-[3px] ${height}`} aria-hidden="true">
      {BARS.map((anim, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${color} ${anim} origin-center`}
          style={{ height: "100%" }}
        />
      ))}
    </div>
  );
}
