
import React from "react";
import { Button } from "@/components/ui/button";

const teams = [
  { name: "All", value: "" },
  { name: "Team Athena", value: "Team Athena" },
  { name: "Team Zeus", value: "Team Zeus" },
  { name: "Team Apollo", value: "Team Apollo" },
  { name: "Team Hades", value: "Team Hades" },
];

interface TeamFilterProps {
  selectedTeam: string;
  onSelect: (team: string) => void;
}

const TeamFilter: React.FC<TeamFilterProps> = ({ selectedTeam, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {teams.map((team) => (
        <Button
          key={team.name}
          variant={selectedTeam === team.value ? "default" : "secondary"}
          className={
            selectedTeam === team.value
              ? "font-bold border-cyber-red text-cyber-red bg-white"
              : "text-white border-cyber-gunmetal bg-cyber-gunmetal hover:bg-cyber-red/30"
          }
          size="sm"
          onClick={() => onSelect(team.value)}
        >
          {team.name}
        </Button>
      ))}
    </div>
  );
};

export default TeamFilter;
