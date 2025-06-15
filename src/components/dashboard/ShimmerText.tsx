
import React from "react";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

const ShimmerText = ({ children, className }: ShimmerTextProps) => {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="
          absolute inset-0 animate-shimmer pointer-events-none
          bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.45)] to-transparent
          opacity-70
        "
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <style>
      {`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.2s linear infinite;
        }
      `}
      </style>
    </span>
  );
};

export default ShimmerText;
