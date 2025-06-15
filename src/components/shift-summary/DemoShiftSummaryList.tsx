import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Demo data structure
type DemoSummary = {
  id: string;
  team: string;
  shift: string;
  date: string;
  shiftLead: string;
  criticalUpdates: string[];
  newIOCs?: string[];
  kbUpdates?: string[];
  recommendations?: string[];
  notes?: string[];
};

const demoDataRaw: DemoSummary[] = [
  {
    id: "1",
    team: "Team Athena",
    shift: "Morning Shift",
    date: "2025-06-14",
    shiftLead: "Priya R.",
    criticalUpdates: [
      "Ticket #452: Ransomware detection on Finance Server confirmed. Host isolated. Investigation ongoing.",
      "Ticket #455: Unauthorized SQL queries on DB server — escalated to DB security team.",
    ],
    newIOCs: [
      "IP: 185.23.112.5 flagged as C2 server.",
      "SHA256: 5f3c6ab1e2... (AgentTesla sample).",
    ],
    kbUpdates: [
      "Lateral Movement Playbook v4.0 updated with new memory dump script.",
    ],
    recommendations: [
      "Continue monitoring Finance Server post-infection indicators.",
      "Validate DB team findings on unauthorized queries.",
    ],
  },
  {
    id: "2",
    team: "Team Zeus",
    shift: "Night Shift",
    date: "2025-06-14",
    shiftLead: "Jason M.",
    criticalUpdates: [
      "Ticket #460: Suspicious beaconing from marketing workstation. Possible Cobalt Strike loader detected.",
      "High volume of failed VPN login attempts from multiple foreign IPs. Geo-blocking rule applied temporarily.",
    ],
    newIOCs: [
      "IP: 104.251.215.66 (Known C2)",
      "Domain: malupdate.com",
    ],
    notes: [
      "VPN logs incomplete — escalate to NetSec team for full packet captures.",
    ],
  },
  {
    id: "3",
    team: "Team Hades",
    shift: "Evening Shift",
    date: "2025-06-13",
    shiftLead: "Sara L.",
    criticalUpdates: [
      "Ticket #447: Privilege escalation detected on internal HR system. User ‘jsmith’ account compromised. Account locked and under review.",
      "Ticket #449: Malware in email attachment — blocked by AV, no further spread observed.",
    ],
    newIOCs: [
      "SHA256: 9d2a7f98d1... (Emotet variant)",
    ],
    kbUpdates: ["Added Emotet disinfection steps."],
    recommendations: [
      "Review all privilege changes for HR users in last 48 hours.",
    ],
  },
  {
    id: "4",
    team: "Team Apollo",
    shift: "Morning Shift",
    date: "2025-06-13",
    shiftLead: "Arjun S.",
    criticalUpdates: [
      "Ticket #438: Possible insider activity — USB mass storage detection on finance workstation.",
      "Ticket #442: Phishing campaign targeting staff — 7 emails reported and blocked.",
    ],
    newIOCs: [
      "Domain: secure-docs-update.com (phishing)",
    ],
    recommendations: [
      "Follow up with HR on USB policy violation.",
      "Verify phishing domain blocked at proxy.",
    ],
  },
  {
    id: "5",
    team: "Team Athena",
    shift: "Evening Shift",
    date: "2025-06-12",
    shiftLead: "Emily T.",
    criticalUpdates: [
      "Ticket #431: DDoS alert from perimeter firewall. Source traced to botnet — traffic mitigated via upstream provider.",
    ],
    newIOCs: [
      "IP Range: 192.168.34.0/24 suspected botnet nodes.",
    ],
    notes: [
      "Recommend permanent block for malicious IPs pending further analysis.",
    ],
  },
  {
    id: "6",
    team: "Team Zeus",
    shift: "Morning Shift",
    date: "2025-06-12",
    shiftLead: "Leo K.",
    criticalUpdates: [
      "Ticket #427: Possible credential stuffing attack detected — 300+ failed login attempts to web portal. WAF rules updated to block suspicious IPs.",
    ],
    newIOCs: [
      "IP: 67.43.221.11 (Brute force source)",
    ],
    recommendations: [
      "Engage Identity team to force reset for targeted accounts.",
    ],
  },
  {
    id: "7",
    team: "Team Hades",
    shift: "Night Shift",
    date: "2025-06-11",
    shiftLead: "Sophia D.",
    criticalUpdates: [
      "Ticket #419: Unauthorized Powershell execution on server WIN-DC01. Host isolated for forensic imaging.",
      "Ticket #420: Suspicious SMB traffic detected — possible lateral movement attempt.",
    ],
    newIOCs: [
      "SHA256: b3d4c1a98e... (unknown PS1 script)",
    ],
    kbUpdates: [
      "Updated lateral movement detection guide.",
    ],
  },
  {
    id: "8",
    team: "Team Apollo",
    shift: "Evening Shift",
    date: "2025-06-11",
    shiftLead: "Oliver G.",
    criticalUpdates: [
      "Ticket #414: Malware alert — JS Downloader blocked on web proxy. No user impact.",
      "Ticket #416: Unusual outbound DNS queries from HR-WS-07. Under investigation.",
    ],
    newIOCs: [
      "Domain: dnslog-update.net (suspicious C2 DNS)",
    ],
    recommendations: [
      "Monitor DNS activity from HR subnet.",
    ],
  },
  {
    id: "9",
    team: "Team Athena",
    shift: "Night Shift",
    date: "2025-06-10",
    shiftLead: "Nisha W.",
    criticalUpdates: [
      "Ticket #408: Cloud storage misconfiguration — public S3 bucket discovered. Read access revoked. No data exfil confirmed.",
    ],
    notes: [
      "Review all cloud storage permissions this week.",
    ],
  },
  {
    id: "10",
    team: "Team Zeus",
    shift: "Evening Shift",
    date: "2025-06-10",
    shiftLead: "Marcus J.",
    criticalUpdates: [
      "Ticket #405: Phishing simulation detected by EDR — no real threat but user training needed.",
      "Ticket #407: Fileless malware attempt blocked on accounting system.",
    ],
    newIOCs: [
      "SHA256: fa9b2c8834... (fileless malware signature)",
    ],
    recommendations: [
      "Arrange mandatory phishing training for new hires.",
    ],
  },
];

// Add team filter logic
interface DemoShiftSummaryListProps {
  selectedTeam?: string; // '' or team name
}

const groupedByDate = demoDataRaw.reduce<Record<string, DemoSummary[]>>((acc, s) => {
  if (!acc[s.date]) acc[s.date] = [];
  acc[s.date].push(s);
  return acc;
}, {});

const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a)); // newest first

// --- Add Manual Demo Entry at the top ---
const DemoShiftSummaryList: React.FC<DemoShiftSummaryListProps> = ({
  selectedTeam = "",
}) => {
  // Demo data now as state, so we can add manually
  const [demoData, setDemoData] = useState<DemoSummary[]>(demoDataRaw);

  // Form state for manual demo entry
  const [form, setForm] = useState<Partial<DemoSummary>>({
    team: "",
    shift: "",
    date: "",
    shiftLead: "",
    criticalUpdates: [],
    newIOCs: [],
    kbUpdates: [],
    recommendations: [],
    notes: [],
  });
  const [showForm, setShowForm] = useState(false);

  // Filter summaries by team if selected
  const filteredByTeam = (summaries: DemoSummary[]) =>
    selectedTeam ? summaries.filter((s) => s.team === selectedTeam) : summaries;

  // Add a demo summary to the list
  const addDemoSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.team || !form.date || !form.shift) {
      return; // basic required fields
    }
    setDemoData([
      {
        id: Date.now().toString(),
        team: form.team,
        shift: form.shift,
        date: form.date,
        shiftLead: form.shiftLead || "",
        criticalUpdates: form.criticalUpdates || [],
        newIOCs: form.newIOCs || [],
        kbUpdates: form.kbUpdates || [],
        recommendations: form.recommendations || [],
        notes: form.notes || [],
      },
      ...demoData,
    ]);
    setForm({
      team: "",
      shift: "",
      date: "",
      shiftLead: "",
      criticalUpdates: [],
      newIOCs: [],
      kbUpdates: [],
      recommendations: [],
      notes: [],
    });
    setShowForm(false);
  };

  // Group and sort new demoData by date for display
  const grouped = demoData.reduce<Record<string, DemoSummary[]>>((acc, s) => {
    if (!acc[s.date]) acc[s.date] = [];
    acc[s.date].push(s);
    return acc;
  }, {});
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold text-white">Demo Shift Summaries</span>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-xs text-cyber-red border border-cyber-red rounded px-2 py-1 hover:bg-cyber-red/20"
        >
          {showForm ? "Cancel" : "+ Add Demo"}
        </button>
      </div>
      <div className="text-xs text-gray-400 mb-2">
        The following example summaries showcase typical SOC handoff scenarios by date and team, for demo purposes.
      </div>
      {showForm && (
        <form className="bg-cyber-gunmetal rounded p-3 mb-4 text-xs grid gap-2" onSubmit={addDemoSummary}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-gray-200 font-medium">Team*</label>
              <select
                required
                value={form.team}
                onChange={e => setForm(f => ({ ...f, team: e.target.value }))}
                className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
              >
                <option value="">Choose team</option>
                <option value="Team Athena">Team Athena</option>
                <option value="Team Zeus">Team Zeus</option>
                <option value="Team Apollo">Team Apollo</option>
                <option value="Team Hades">Team Hades</option>
              </select>
            </div>
            <div>
              <label className="text-gray-200 font-medium">Shift*</label>
              <input
                required
                type="text"
                className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
                value={form.shift}
                placeholder="e.g. Morning Shift"
                onChange={e => setForm(f => ({ ...f, shift: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-gray-200 font-medium">Date*</label>
              <input
                required
                type="date"
                className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-gray-200 font-medium">Shift Lead</label>
              <input
                type="text"
                className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
                value={form.shiftLead ?? ""}
                placeholder="Name (optional)"
                onChange={e => setForm(f => ({ ...f, shiftLead: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="text-gray-200 font-medium">Critical Updates</label>
            <textarea
              className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
              rows={2}
              placeholder="Enter each as a line"
              value={form.criticalUpdates?.join('\n') || ""}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  criticalUpdates: e.target.value.split('\n').filter(Boolean),
                }))
              }
            />
          </div>
          <div>
            <label className="text-gray-200 font-medium">New IoCs</label>
            <textarea
              className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
              rows={2}
              placeholder="Indicators of Compromise (each line is an entry)"
              value={form.newIOCs?.join('\n') || ""}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  newIOCs: e.target.value.split('\n').filter(Boolean),
                }))
              }
            />
          </div>
          <div>
            <label className="text-gray-200 font-medium">Knowledge Base Updates</label>
            <textarea
              className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
              rows={1}
              placeholder="Each line is a KB update"
              value={form.kbUpdates?.join('\n') || ""}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  kbUpdates: e.target.value.split('\n').filter(Boolean),
                }))
              }
            />
          </div>
          <div>
            <label className="text-gray-200 font-medium">Recommendations</label>
            <textarea
              className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
              rows={1}
              placeholder="Each line is a recommendation"
              value={form.recommendations?.join('\n') || ""}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  recommendations: e.target.value.split('\n').filter(Boolean),
                }))
              }
            />
          </div>
          <div>
            <label className="text-gray-200 font-medium">Notes</label>
            <textarea
              className="w-full p-1 rounded bg-black border border-cyber-gunmetal text-white"
              rows={1}
              placeholder="Each line is a note"
              value={form.notes?.join('\n') || ""}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  notes: e.target.value.split('\n').filter(Boolean),
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyber-red text-white py-1 rounded hover:bg-cyber-red-dark transition"
          >
            Add Demo Summary
          </button>
        </form>
      )}

      <ScrollArea className="h-[calc(100vh-175px)] pr-2">
        <div>
          {sortedDates.map(date => {
            const dateSummaries = filteredByTeam(grouped[date]);
            if (!dateSummaries.length) return null;
            return (
              <div key={date} className="mb-6">
                <div className="flex items-center mb-3">
                  <Separator className="flex-1 bg-cyber-gunmetal" />
                  <span className="mx-3 text-xs font-semibold text-cyber-red">
                    {new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  <Separator className="flex-1 bg-cyber-gunmetal" />
                </div>
                <div className="grid gap-4">
                  {dateSummaries.map((summary) => (
                    <Card key={summary.id} className={cn(
                      "bg-gradient-to-br border-cyber-gunmetal text-white transition",
                      summary.team === "Team Athena" && "from-fuchsia-950/60 to-cyber-darker/95",
                      summary.team === "Team Zeus" && "from-blue-950/60 to-cyber-darker/95",
                      summary.team === "Team Apollo" && "from-orange-900/70 to-cyber-darker/95",
                      summary.team === "Team Hades" && "from-gray-900/90 to-cyber-darker/95"
                    )}>
                      <CardHeader className="pb-2 flex flex-col gap-y-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex flex-row gap-x-2 items-center">
                            <span className={cn("font-bold", {
                              "text-fuchsia-300": summary.team === "Team Athena",
                              "text-blue-300": summary.team === "Team Zeus",
                              "text-orange-300": summary.team === "Team Apollo",
                              "text-gray-200": summary.team === "Team Hades",
                            })}>{summary.team}</span>
                            <span className="px-2 py-0.5 text-xs rounded bg-cyber-gunmetal text-gray-200 font-normal">{summary.shift}</span>
                          </CardTitle>
                          <span className="text-xs text-gray-300">
                            Shift Lead: <span className="font-medium text-white">{summary.shiftLead}</span>
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="grid gap-2 text-sm">
                        {summary.criticalUpdates.length > 0 && (
                          <div>
                            <div className="font-semibold text-cyber-red">Critical Updates:</div>
                            <ul className="list-disc list-inside text-gray-100 mt-1">
                              {summary.criticalUpdates.map((text, idx) => (
                                <li key={idx}>{text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {summary.newIOCs && summary.newIOCs.length > 0 && (
                          <div>
                            <div className="font-semibold text-cyber-red">New IoCs:</div>
                            <ul className="list-disc list-inside text-gray-100 mt-1">
                              {summary.newIOCs.map((text, idx) => (
                                <li key={idx}>{text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {summary.kbUpdates && summary.kbUpdates.length > 0 && (
                          <div>
                            <div className="font-semibold text-cyber-red">Knowledge Base Updates:</div>
                            <ul className="list-disc list-inside text-gray-100 mt-1">
                              {summary.kbUpdates.map((text, idx) => (
                                <li key={idx}>{text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {summary.notes && summary.notes.length > 0 && (
                          <div>
                            <div className="font-semibold text-cyber-red">Notes:</div>
                            <ul className="list-disc list-inside text-gray-100 mt-1">
                              {summary.notes.map((text, idx) => (
                                <li key={idx}>{text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {summary.recommendations && summary.recommendations.length > 0 && (
                          <div>
                            <div className="font-semibold text-cyber-red">Recommendations:</div>
                            <ul className="list-disc list-inside text-gray-100 mt-1">
                              {summary.recommendations.map((text, idx) => (
                                <li key={idx}>{text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DemoShiftSummaryList;

// NOTE: This file is getting pretty long. If you’d like to refactor it into smaller components for better maintainability, just let me know!
