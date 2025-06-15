
import React from "react";

const DEFAULT_SHIMMER_SPEED = 2.5; // seconds
const DEFAULT_SHIMMER_REPEAT = "infinite"; // or any number for finite repeats

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;  // shimmer speed in seconds
  repeat?: number | "infinite";  // number of repeats or "infinite"
}

const ShimmerText = ({
  children,
  className,
  speed = DEFAULT_SHIMMER_SPEED,
  repeat = DEFAULT_SHIMMER_REPEAT,
}: ShimmerTextProps) => {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="
          absolute inset-0 pointer-events-none bg-gradient-to-r
          from-transparent via-[rgba(255,255,255,0.45)] to-transparent opacity-70
        "
        style={{
          backgroundSize: "200% 100%",
          animation: `shimmer ${speed}s linear ${repeat}`,
        }}
      />
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </span>
  );
};

export default ShimmerText;
