
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteIncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  incidentTitle: string;
}

const DeleteIncidentDialog: React.FC<DeleteIncidentDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  incidentTitle,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-cyber-red">
          <AlertTriangle className="h-6 w-6" />
          Delete Incident
        </DialogTitle>
      </DialogHeader>
      <div className="text-gray-300 mb-4 text-sm">
        Are you sure you want to delete the incident <span className="font-semibold text-white">{incidentTitle}</span>?<br />
        <span className="text-red-400">This cannot be undone.</span>
      </div>
      <DialogFooter>
        <Button variant="outline" className="border-cyber-gunmetal" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button className="bg-cyber-red hover:bg-cyber-red-dark text-white" onClick={onConfirm}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteIncidentDialog;
