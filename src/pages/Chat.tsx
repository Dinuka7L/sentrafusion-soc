
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/chat/ChatInterface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChatSession, ChatMessage } from '@/types';
import { MessageSquare, Plus, Clock, AlertTriangle, FileText } from 'lucide-react';

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState('1');

  // Mock data
  const chatSessions: ChatSession[] = [
    {
      id: '1',
      title: 'PowerShell Investigation',
      workspaceId: 'ws1',
      incidentId: 'inc1',
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [
        {
          id: '1',
          content: 'I need help analyzing this suspicious PowerShell command that was detected on endpoint DESKTOP-ABC123',
          role: 'user',
          timestamp: new Date(Date.now() - 600000),
        },
        {
          id: '2',
          content: 'I can help you analyze the PowerShell activity. Based on the alert context, this appears to be an encoded PowerShell command. Let me break down what we know:\n\n1. **Encoded Command**: The PowerShell uses base64 encoding, which is common in malicious scripts\n2. **Execution Context**: Ran from a user account with elevated privileges\n3. **Network Activity**: Made outbound connections to suspicious IPs\n\nI recommend:\n- Isolating the affected endpoint\n- Running a full memory dump\n- Checking for persistence mechanisms\n\nWould you like me to generate specific IOCs to hunt for across your environment?',
          role: 'assistant',
          timestamp: new Date(Date.now() - 580000),
          context: ['windows-security-logs', 'powershell-analysis-playbook'],
          citations: [
            { id: 'doc1', name: 'PowerShell Analysis Playbook.pdf', type: 'pdf', size: 1024, uploadedAt: new Date(), uploadedBy: { id: '1', email: 'admin@company.com', name: 'Admin', role: 'admin' }, indexed: true, workspaceId: 'ws1' }
          ]
        },
        {
          id: '3',
          content: 'Yes, please generate IOCs and also suggest containment actions',
          role: 'user',
          timestamp: new Date(Date.now() - 300000),
        },
        {
          id: '4',
          content: 'Here are the IOCs I\'ve generated based on the analysis:\n\n**File Hashes:**\n- SHA256: a1b2c3d4e5f6789...\n- MD5: 9f8e7d6c5b4a3...\n\n**Network IOCs:**\n- IP: 192.168.100.50 (C2 Server)\n- Domain: malicious-domain.com\n- URL: hxxp://evil-site[.]com/payload\n\n**Registry Keys:**\n- HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\MalwareKey\n\n**Containment Actions:**\n1. Immediately isolate DESKTOP-ABC123 from network\n2. Preserve memory dump and disk image\n3. Check all systems for the above IOCs\n4. Reset credentials for affected user account\n5. Update firewall rules to block C2 domains\n\nShall I create an incident ticket and escalate to Tier-2?',
          role: 'assistant',
          timestamp: new Date(Date.now() - 120000),
          context: ['ioc-database', 'containment-procedures'],
        }
      ]
    },
    {
      id: '2',
      title: 'Network Anomaly Analysis',
      workspaceId: 'ws1',
      createdAt: new Date(Date.now() - 3600000),
      updatedAt: new Date(Date.now() - 3600000),
      messages: [
        {
          id: '1',
          content: 'I\'m seeing unusual traffic patterns in network segment 10.0.1.0/24. Can you help me understand what might be happening?',
          role: 'user',
          timestamp: new Date(Date.now() - 3600000),
        }
      ]
    }
  ];

  const activeChat = chatSessions.find(chat => chat.id === activeChatId) || chatSessions[0];

  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
    // In a real app, this would send to the backend and update the chat
  };

  const handleEscalate = () => {
    console.log('Escalating incident...');
    // Open escalation wizard
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-120px)] flex gap-6">
        {/* Chat Sessions Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="bg-cyber-darker border-cyber-gunmetal">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-cyber-red" />
                  Chat Sessions
                </span>
                <Button size="sm" className="bg-cyber-red hover:bg-cyber-red-dark text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setActiveChatId(session.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    session.id === activeChatId
                      ? 'bg-cyber-red text-white'
                      : 'bg-cyber-gunmetal/50 text-gray-300 hover:bg-cyber-gunmetal'
                  }`}
                >
                  <div className="font-medium truncate">{session.title}</div>
                  <div className="text-xs flex items-center mt-1 opacity-75">
                    <Clock className="h-3 w-3 mr-1" />
                    {session.updatedAt.toLocaleTimeString()}
                  </div>
                  {session.incidentId && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Incident
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Context Panel */}
          <Card className="bg-cyber-darker border-cyber-gunmetal">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-cyber-red" />
                Context Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active Alerts</span>
                  <Badge className="bg-cyber-red text-white">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Indexed Documents</span>
                  <Badge className="bg-green-500 text-white">247</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">IOC Database</span>
                  <Badge className="bg-blue-500 text-white">12.3k</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Threat Intel Feeds</span>
                  <Badge className="bg-purple-500 text-white">Live</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1">
          <ChatInterface
            session={activeChat}
            onSendMessage={handleSendMessage}
            onEscalate={handleEscalate}
            className="h-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
