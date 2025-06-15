
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

interface AddIncidentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (incident: {
    title: string;
    description: string;
    severity: "critical" | "high" | "medium" | "low" | "info";
    priority: number;
    source: string;
    iocs?: { type: string; value: string }[];
  }) => void;
}

const AddIncidentFormDialog: React.FC<AddIncidentFormDialogProps> = ({
  open,
  onOpenChange,
  onAdd,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"critical" | "high" | "medium" | "low" | "info">("critical");
  const [priority, setPriority] = useState<number>(1);
  const [source, setSource] = useState("");
  // For simplicity, allow up to 2 IOCs (optional, add as needed)
  const [ioc1Type, setIoc1Type] = useState("ip");
  const [ioc1Value, setIoc1Value] = useState("");
  const [ioc2Type, setIoc2Type] = useState("hash");
  const [ioc2Value, setIoc2Value] = useState("");

  const handleAdd = () => {
    if (title && description && severity && priority && source) {
      const iocs = [];
      if (ioc1Value) iocs.push({ type: ioc1Type, value: ioc1Value });
      if (ioc2Value) iocs.push({ type: ioc2Type, value: ioc2Value });
      onAdd({
        title,
        description,
        severity,
        priority,
        source,
        iocs: iocs.length ? iocs : undefined,
      });
      setTitle(""); setDescription(""); setSeverity("critical"); setPriority(1); setSource("");
      setIoc1Type("ip"); setIoc1Value(""); setIoc2Type("hash"); setIoc2Value("");
      onOpenChange(false);
    }
  };

  const disabled = !title || !description || !source;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-cyber-red" />
            Add Incident
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="Incident Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="bg-cyber-darker border-cyber-gunmetal text-white"
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="bg-cyber-darker border-cyber-gunmetal text-white"
          />
          <div className="flex gap-2">
            <Select value={severity} onValueChange={v => setSeverity(v as any)}>
              <SelectTrigger className="w-32 bg-cyber-darker border-cyber-gunmetal text-white">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priority.toString()} onValueChange={v => setPriority(Number(v))}>
              <SelectTrigger className="w-32 bg-cyber-darker border-cyber-gunmetal text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                <SelectItem value="1">Priority 1</SelectItem>
                <SelectItem value="2">Priority 2</SelectItem>
                <SelectItem value="3">Priority 3</SelectItem>
                <SelectItem value="4">Priority 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Source (e.g. SIEM, EDR...)"
            value={source}
            onChange={e => setSource(e.target.value)}
            className="bg-cyber-darker border-cyber-gunmetal text-white"
          />
          <div className="mt-2 border-t border-cyber-gunmetal pt-2">
            <span className="text-sm text-gray-400">Optional IOCs</span>
            <div className="flex gap-2 mt-1">
              <Select value={ioc1Type} onValueChange={setIoc1Type}>
                <SelectTrigger className="w-24 bg-cyber-darker border-cyber-gunmetal text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                  <SelectItem value="ip">IP</SelectItem>
                  <SelectItem value="hash">Hash</SelectItem>
                  <SelectItem value="domain">Domain</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Value"
                value={ioc1Value}
                onChange={e => setIoc1Value(e.target.value)}
                className="bg-cyber-darker border-cyber-gunmetal text-white"
              />
            </div>
            <div className="flex gap-2 mt-1">
              <Select value={ioc2Type} onValueChange={setIoc2Type}>
                <SelectTrigger className="w-24 bg-cyber-darker border-cyber-gunmetal text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                  <SelectItem value="ip">IP</SelectItem>
                  <SelectItem value="hash">Hash</SelectItem>
                  <SelectItem value="domain">Domain</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Value"
                value={ioc2Value}
                onChange={e => setIoc2Value(e.target.value)}
                className="bg-cyber-darker border-cyber-gunmetal text-white"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="border-cyber-gunmetal"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-cyber-red hover:bg-cyber-red-dark text-white"
            onClick={handleAdd}
            disabled={disabled}
          >
            Add Incident
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddIncidentFormDialog;
