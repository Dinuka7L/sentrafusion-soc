
import React from "react";
import { Loader2 } from "lucide-react";

interface LoaderOverlayProps {
  show: boolean;
}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({ show }) => {
  return show ? (
    <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center transition-opacity animate-fade-in">
      <Loader2 className="animate-spin h-12 w-12 text-cyber-red" />
    </div>
  ) : null;
};

export default LoaderOverlay;
