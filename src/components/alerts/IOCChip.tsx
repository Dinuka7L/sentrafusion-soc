import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface IOCChipProps {
  type: string;
  value: string;
  confidence?: number;
  className?: string;
}

function sanitizeIp(ip: string) {
  // Remove square brackets, trim whitespace, replace multiple dots, keep IPv6
  let cleaned = ip.trim();
  cleaned = cleaned.replace(/^\[|\]$/g, ""); // remove [ and ] at start/end
  cleaned = cleaned.replace(/\s+/g, "");
  // Remove any non-numeric/non-colon/non-dot/non-alpha characters except for IPv6 colons
  cleaned = cleaned.replace(/[^0-9a-fA-F\.:]/g, "");
  // Replace multiple consecutive dots with single dot
  cleaned = cleaned.replace(/\.{2,}/g, ".");
  // For IPv4: ensure it matches x.x.x.x (simple, not strict)
  if (/^[0-9./]+$/.test(cleaned) && cleaned.split(".").length === 4) {
    // Remove trailing dot
    if (cleaned.endsWith(".")) cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

export const IOCChip: React.FC<IOCChipProps> = ({
  type,
  value,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  // Show readable but safe format for IP types
  const displayValue =
    type === "ip" ? sanitizeIp(value) : value;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayValue);
      setCopied(true);
      toast({
        title: "IOC Copied",
        description: (
          <div className="flex flex-col">
            <span className="font-mono truncate">{displayValue}</span>
          </div>
        ),
      });
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Badge
      variant="outline"
      className={`text-xs flex items-center gap-1 px-2 py-1 ${className}`}
    >
      <span>
        {type}: <span className="font-mono">{displayValue.length > 20 ? displayValue.slice(0, 20) + "..." : displayValue}</span>
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Copy IOC value"
        onClick={handleCopy}
        className="ml-1 p-0 size-5 hover:bg-cyber-gunmetal"
      >
        <Copy className={`w-4 h-4 ${copied ? 'text-green-500' : 'text-gray-400'}`} />
      </Button>
    </Badge>
  );
};

export default IOCChip;
