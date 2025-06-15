import React from 'react';
import Layout from '@/components/layout/Layout';
import MetricCard from '@/components/dashboard/MetricCard';
import AlertCard from '@/components/alerts/AlertCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp, 
  Database,
  MessageSquare,
  FileText,
  Activity
} from 'lucide-react';
import { Alert } from '@/types';

// Define a glass effect class (Tailwind-compatible)
const glassClass =
  "bg-cyber-darker/60 border border-cyber-red/30 backdrop-blur-lg shadow-lg shadow-cyber-red/10 transition hover:border-cyber-red/80";

const Dashboard = () => {
  // Mock data
  const recentAlerts: Alert[] = [
    {
      id: '1',
      title: 'Suspicious PowerShell Activity Detected',
      description: 'Encoded PowerShell command executed on DESKTOP-ABC123',
      severity: 'critical',
      source: 'Windows Defender ATP',
      timestamp: new Date(),
      status: 'open',
      iocs: [
        { id: '1', type: 'hash', value: 'a1b2c3d4e5f6...', confidence: 95, tags: ['malware'], firstSeen: new Date(), lastSeen: new Date() }
      ]
    },
    {
      id: '2',
      title: 'Multiple Failed Login Attempts',
      description: 'Brute force attack detected from IP 192.168.1.100',
      severity: 'high',
      source: 'Active Directory',
      timestamp: new Date(Date.now() - 300000),
      status: 'investigating'
    },
    {
      id: '3',
      title: 'Unusual Network Traffic Pattern',
      description: 'Data exfiltration pattern detected on network segment 10.0.1.0/24',
      severity: 'medium',
      source: 'Network IDS',
      timestamp: new Date(Date.now() - 600000),
      status: 'open'
    }
  ];

  return (
    <Layout>
      {/* Custom cyber background with dark grey and subtle red gradients */}
      <div className="space-y-6 relative min-h-screen py-2"
        style={{
          background: "linear-gradient(120deg, #200c13 0%, #1e1e1e 60%, #3e151a 100%)",
        }}
      >
        {/* Layered red pattern (optional for cyber effect) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 80% 10%, rgba(198, 40, 40, 0.15) 0, transparent 60%), radial-gradient(circle at 8% 85%, rgba(198, 40, 40, 0.12) 0, transparent 70%)",
          }}
        ></div>
        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">SOC Dashboard</h1>
              <p className="text-gray-400 mt-1">Real-time security operations overview</p>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-cyber-red hover:bg-cyber-red-dark text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
              <Button variant="outline" className="border-cyber-gunmetal text-gray-300 hover:bg-cyber-gunmetal">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Active Alerts"
              value="23"
              change="+5 from last hour"
              changeType="negative"
              icon={AlertTriangle}
              className={glassClass}
              highlightValue
            />
            <MetricCard
              title="Open Incidents"
              value="7"
              change="-2 from yesterday"
              changeType="positive"
              icon={Shield}
              className={glassClass}
              highlightValue
            />
            <MetricCard
              title="Avg Response Time"
              value="4.2m"
              change="-30s from last week"
              changeType="positive"
              icon={Clock}
              className={glassClass}
              highlightValue
            />
            <MetricCard
              title="Analysts Online"
              value="8"
              change="Full coverage"
              changeType="positive"
              icon={Users}
              className={glassClass}
              highlightValue
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Alerts */}
            <div className="lg:col-span-2">
              <Card className={glassClass}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-cyber-red" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert}
                      onInvestigate={(alert) => console.log('Investigating', alert.id)}
                      onAssign={(alert) => console.log('Assigning', alert.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* System Status */}
              <Card className={glassClass}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-cyber-red" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">SIEM Integration</span>
                    <Badge className="bg-green-500 text-white">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Threat Intel Feeds</span>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Email Gateway</span>
                    <Badge className="bg-yellow-500 text-white">Warning</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Network Monitoring</span>
                    <Badge className="bg-green-500 text-white">Online</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className={glassClass}>
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-cyber-red hover:bg-cyber-red-dark text-white">
                    Create Incident
                  </Button>
                  <Button variant="outline" className="w-full border-cyber-gunmetal text-gray-300 hover:bg-cyber-gunmetal">
                    Run IOC Search
                  </Button>
                  <Button variant="outline" className="w-full border-cyber-gunmetal text-gray-300 hover:bg-cyber-gunmetal">
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full border-cyber-gunmetal text-gray-300 hover:bg-cyber-gunmetal">
                    Export Logs
                  </Button>
                </CardContent>
              </Card>

              {/* Threat Intelligence */}
              <Card className={glassClass}>
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="h-5 w-5 mr-2 text-cyber-red" />
                    Threat Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>New IOCs Today</span>
                      <span className="text-white font-semibold">127</span>
                    </div>
                    <div className="flex justify-between text-gray-300 mt-2">
                      <span>Reputation Updates</span>
                      <span className="text-white font-semibold">1,432</span>
                    </div>
                    <div className="flex justify-between text-gray-300 mt-2">
                      <span>Feed Status</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
