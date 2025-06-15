import React, { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import AlertCard from '@/components/alerts/AlertCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert } from '@/types';
import { Search, Filter, RefreshCw, AlertTriangle, Clock } from 'lucide-react';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('12'); // hours

  // Enhanced mock incidents data with priority levels 1-4
  const incidents: (Alert & { priority: number })[] = [
    {
      id: '1',
      title: 'Critical System Breach - Active APT Campaign',
      description: 'Advanced persistent threat detected with active data exfiltration. Multiple compromised endpoints with C2 communications established.',
      severity: 'critical',
      priority: 1,
      source: 'SIEM Correlation Engine',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: 'open',
      iocs: [
        { id: '1', type: 'hash', value: 'a1b2c3d4e5f6789abcdef', confidence: 95, tags: ['malware', 'apt'], firstSeen: new Date(), lastSeen: new Date() },
        { id: '2', type: 'ip', value: '192.168.100.50', confidence: 87, tags: ['c2'], firstSeen: new Date(), lastSeen: new Date() }
      ]
    },
    {
      id: '2',
      title: 'Ransomware Activity Detected',
      description: 'Suspicious encryption activity and ransom note deployment detected on multiple workstations in Finance department.',
      severity: 'critical',
      priority: 1,
      source: 'Endpoint Protection',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      status: 'investigating',
      assignee: { id: '2', email: 'analyst@company.com', name: 'John Analyst', role: 'tier1' },
      iocs: [
        { id: '3', type: 'hash', value: 'f1e2d3c4b5a6789fedcba', confidence: 98, tags: ['ransomware'], firstSeen: new Date(), lastSeen: new Date() }
      ]
    },
    {
      id: '3',
      title: 'Privilege Escalation Attempt',
      description: 'User account attempted to escalate privileges using known vulnerability CVE-2021-1234.',
      severity: 'high',
      priority: 2,
      source: 'Endpoint Detection',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'open',
      assignee: { id: '2', email: 'analyst@company.com', name: 'John Analyst', role: 'tier1' }
    },
    {
      id: '4',
      title: 'Suspicious Network Scanning',
      description: 'Internal host performing comprehensive network reconnaissance across multiple subnets.',
      severity: 'high',
      priority: 2,
      source: 'Network IDS',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      status: 'investigating',
      iocs: [
        { id: '4', type: 'ip', value: '10.0.50.25', confidence: 85, tags: ['scanning'], firstSeen: new Date(), lastSeen: new Date() }
      ]
    },
    {
      id: '5',
      title: 'Malware Signature Match',
      description: 'Known malware signature detected in email attachment. The file appears to be a variant of the TrickBot banking trojan.',
      severity: 'medium',
      priority: 3,
      source: 'Email Security Gateway',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: 'resolved',
      assignee: { id: '3', email: 'senior@company.com', name: 'Jane Senior', role: 'tier2' }
    },
    {
      id: '6',
      title: 'Multiple Failed Login Attempts',
      description: 'Brute force attack detected from external IP targeting admin accounts.',
      severity: 'medium',
      priority: 3,
      source: 'Active Directory',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      status: 'open',
      iocs: [
        { id: '5', type: 'ip', value: '203.0.113.42', confidence: 92, tags: ['bruteforce'], firstSeen: new Date(), lastSeen: new Date() }
      ]
    },
    {
      id: '7',
      title: 'Anomalous DNS Queries',
      description: 'Multiple DNS queries to newly registered domains with suspicious patterns detected.',
      severity: 'low',
      priority: 4,
      source: 'DNS Security',
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
      status: 'open'
    },
    {
      id: '8',
      title: 'Unusual Process Execution',
      description: 'PowerShell execution with encoded commands detected on user workstation.',
      severity: 'low',
      priority: 4,
      source: 'Windows Defender ATP',
      timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000), // 11 hours ago
      status: 'false-positive',
      assignee: { id: '2', email: 'analyst@company.com', name: 'John Analyst', role: 'tier1' }
    }
  ];

  const filteredIncidents = useMemo(() => {
    const now = new Date();
    const timeThreshold = new Date(now.getTime() - parseInt(timeFilter) * 60 * 60 * 1000);

    return incidents.filter(incident => {
      const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incident.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = priorityFilter === 'all' || incident.priority.toString() === priorityFilter;
      const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
      const matchesTime = incident.timestamp >= timeThreshold;
      
      return matchesSearch && matchesPriority && matchesStatus && matchesTime;
    }).sort((a, b) => {
      // Sort by priority (1 highest, 4 lowest), then by timestamp (newest first)
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [incidents, searchTerm, priorityFilter, statusFilter, timeFilter]);

  const getIncidentCounts = () => {
    const total = filteredIncidents.length;
    const priority1 = filteredIncidents.filter(i => i.priority === 1).length;
    const priority2 = filteredIncidents.filter(i => i.priority === 2).length;
    const open = filteredIncidents.filter(i => i.status === 'open').length;
    
    return { total, priority1, priority2, open };
  };

  const counts = getIncidentCounts();

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-600 text-white';
      case 2: return 'bg-orange-600 text-white';
      case 3: return 'bg-yellow-600 text-white';
      case 4: return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Security Incidents</h1>
            <p className="text-gray-400 mt-1">Monitor and investigate security incidents by priority</p>
          </div>
          <div className="flex space-x-2">
            <Button className="bg-cyber-red hover:bg-cyber-red-dark text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-cyber-darker border-cyber-gunmetal">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Incidents</p>
                  <p className="text-2xl font-bold text-white">{counts.total}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-darker border-cyber-gunmetal">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Priority 1</p>
                  <p className="text-2xl font-bold text-red-500">{counts.priority1}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-darker border-cyber-gunmetal">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Priority 2</p>
                  <p className="text-2xl font-bold text-orange-500">{counts.priority2}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-darker border-cyber-gunmetal">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Open</p>
                  <p className="text-2xl font-bold text-yellow-500">{counts.open}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-cyber-darker border-cyber-gunmetal">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Filter className="h-5 w-5 mr-2 text-cyber-red" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-cyber-darker border-cyber-gunmetal text-white"
                  />
                </div>
              </div>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px] bg-cyber-darker border-cyber-gunmetal text-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="1">Priority 1 (Critical)</SelectItem>
                  <SelectItem value="2">Priority 2 (High)</SelectItem>
                  <SelectItem value="3">Priority 3 (Medium)</SelectItem>
                  <SelectItem value="4">Priority 4 (Low)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-cyber-darker border-cyber-gunmetal text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="false-positive">False Positive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px] bg-cyber-darker border-cyber-gunmetal text-white">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                  <SelectItem value="1">Last 1 hour</SelectItem>
                  <SelectItem value="6">Last 6 hours</SelectItem>
                  <SelectItem value="12">Last 12 hours</SelectItem>
                  <SelectItem value="24">Last 24 hours</SelectItem>
                  <SelectItem value="72">Last 3 days</SelectItem>
                  <SelectItem value="168">Last 7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Incidents List */}
        <div className="h-[60vh] overflow-y-auto pr-1 space-y-4 custom-scrollbar">
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((incident) => (
              <Card key={incident.id} className="bg-cyber-darker border-cyber-gunmetal hover:border-cyber-red transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(incident.priority)}>
                          Priority {incident.priority}
                        </Badge>
                        <Badge className={
                          incident.status === 'open' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          incident.status === 'investigating' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          incident.status === 'resolved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        } variant="outline">
                          {incident.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                    </div>
                    <div className="flex flex-col items-end text-xs text-gray-400">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {incident.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="mt-1">{incident.source}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{incident.description}</p>
                  
                  {incident.assignee && (
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Assigned to: <span className="text-white ml-1">{incident.assignee.name}</span>
                    </div>
                  )}

                  {incident.iocs && incident.iocs.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h4 className="text-sm font-medium text-gray-300">IOCs:</h4>
                      <div className="flex flex-wrap gap-1">
                        {incident.iocs.slice(0, 3).map(ioc => (
                          <Badge key={ioc.id} variant="outline" className="text-xs">
                            {ioc.type}: {ioc.value.substring(0, 20)}...
                          </Badge>
                        ))}
                        {incident.iocs.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{incident.iocs.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => console.log('Investigating', incident.id)}
                      className="bg-cyber-red hover:bg-cyber-red-dark text-white"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Investigate
                    </Button>
                    {!incident.assignee && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => console.log('Assigning', incident.id)}
                        className="border-cyber-gunmetal text-gray-300 hover:bg-cyber-gunmetal"
                      >
                        Assign to Me
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-cyber-darker border-cyber-gunmetal">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No incidents match your current filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setPriorityFilter('all');
                    setStatusFilter('all');
                    setTimeFilter('12');
                  }}
                  className="mt-4 border-cyber-gunmetal text-gray-300 hover:bg-cyber-gunmetal"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Alerts;
