
import React, { useState } from 'react';
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
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock alerts data
  const alerts: Alert[] = [
    {
      id: '1',
      title: 'Suspicious PowerShell Activity Detected',
      description: 'Encoded PowerShell command executed on DESKTOP-ABC123 with potential malicious intent. The command appears to be base64 encoded and attempts to download additional payloads.',
      severity: 'critical',
      source: 'Windows Defender ATP',
      timestamp: new Date(),
      status: 'open',
      iocs: [
        { id: '1', type: 'hash', value: 'a1b2c3d4e5f6789abcdef', confidence: 95, tags: ['malware', 'powershell'], firstSeen: new Date(), lastSeen: new Date() },
        { id: '2', type: 'ip', value: '192.168.100.50', confidence: 87, tags: ['c2'], firstSeen: new Date(), lastSeen: new Date() }
      ]
    },
    {
      id: '2',
      title: 'Multiple Failed Login Attempts',
      description: 'Brute force attack detected from IP 192.168.1.100 targeting user accounts admin, administrator, and service accounts.',
      severity: 'high',
      source: 'Active Directory',
      timestamp: new Date(Date.now() - 300000),
      status: 'investigating',
      assignee: { id: '2', email: 'analyst@company.com', name: 'John Analyst', role: 'tier1' },
      iocs: [
        { id: '3', type: 'ip', value: '192.168.1.100', confidence: 92, tags: ['bruteforce'], firstSeen: new Date(), lastSeen: new Date() }
      ]
    },
    {
      id: '3',
      title: 'Unusual Network Traffic Pattern',
      description: 'Data exfiltration pattern detected on network segment 10.0.1.0/24 with large amounts of data being transmitted to external hosts.',
      severity: 'medium',
      source: 'Network IDS',
      timestamp: new Date(Date.now() - 600000),
      status: 'open',
      iocs: [
        { id: '4', type: 'domain', value: 'suspicious-site.com', confidence: 78, tags: ['exfiltration'], firstSeen: new Date(), lastSeen: new Date() }
      ]
    },
    {
      id: '4',
      title: 'Malware Signature Match',
      description: 'Known malware signature detected in email attachment. The file appears to be a variant of the TrickBot banking trojan.',
      severity: 'high',
      source: 'Email Security Gateway',
      timestamp: new Date(Date.now() - 900000),
      status: 'resolved',
      assignee: { id: '3', email: 'senior@company.com', name: 'Jane Senior', role: 'tier2' }
    },
    {
      id: '5',
      title: 'Privilege Escalation Attempt',
      description: 'User account attempted to escalate privileges using known vulnerability CVE-2021-1234.',
      severity: 'critical',
      source: 'Endpoint Detection',
      timestamp: new Date(Date.now() - 1200000),
      status: 'false-positive',
      assignee: { id: '2', email: 'analyst@company.com', name: 'John Analyst', role: 'tier1' }
    },
    {
      id: '6',
      title: 'Anomalous DNS Queries',
      description: 'Multiple DNS queries to newly registered domains with suspicious patterns detected from workstation WS-FINANCE-01.',
      severity: 'low',
      source: 'DNS Security',
      timestamp: new Date(Date.now() - 1800000),
      status: 'open'
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getAlertCounts = () => {
    const total = alerts.length;
    const critical = alerts.filter(a => a.severity === 'critical').length;
    const high = alerts.filter(a => a.severity === 'high').length;
    const open = alerts.filter(a => a.status === 'open').length;
    
    return { total, critical, high, open };
  };

  const counts = getAlertCounts();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Security Alerts</h1>
            <p className="text-gray-400 mt-1">Monitor and investigate security incidents</p>
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
                  <p className="text-sm text-gray-400">Total Alerts</p>
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
                  <p className="text-sm text-gray-400">Critical</p>
                  <p className="text-2xl font-bold text-red-500">{counts.critical}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyber-darker border-cyber-gunmetal">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">High Priority</p>
                  <p className="text-2xl font-bold text-orange-500">{counts.high}</p>
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
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-cyber-darker border-cyber-gunmetal text-white"
                  />
                </div>
              </div>
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[180px] bg-cyber-darker border-cyber-gunmetal text-white">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent className="bg-cyber-darker border-cyber-gunmetal">
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
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
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onInvestigate={(alert) => console.log('Investigating', alert.id)}
                onAssign={(alert) => console.log('Assigning', alert.id)}
              />
            ))
          ) : (
            <Card className="bg-cyber-darker border-cyber-gunmetal">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No alerts match your current filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSeverityFilter('all');
                    setStatusFilter('all');
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
