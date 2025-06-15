
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface AddIncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: () => void;
}
const AddIncidentDialog: React.FC<AddIncidentDialogProps> = ({ open, onOpenChange, onAdd }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-cyber-red" />
          Add Example Incident
        </DialogTitle>
      </DialogHeader>
      <div className="text-gray-300 mb-4 text-sm">
        This will add the following demo incident:
        <ul className="list-disc ml-6 mt-2">
          <li>Priority 1, <b className="text-cyber-red">OPEN</b></li>
          <li><strong>Critical System Breach - Active APT Campaign</strong></li>
          <li>Source: SIEM Correlation Engine</li>
          <li>IOCs: <span className="font-mono">hash: a1b2c3d4e5f6789ab...</span> and <span className="font-mono">ip: 192.168.100.50</span></li>
          <li>Status: Not escalated</li>
        </ul>
        <div className="mt-4">
          <strong>Description:</strong><br />
          Advanced persistent threat detected with active data exfiltration. Multiple compromised endpoints with C2 communications established.
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" className="border-cyber-gunmetal" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button className="bg-cyber-red hover:bg-cyber-red-dark text-white" onClick={onAdd}>
          Add Incident
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default AddIncidentDialog;
