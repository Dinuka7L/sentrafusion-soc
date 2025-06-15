
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  MessageSquare, 
  AlertTriangle, 
  FileText, 
  Settings, 
  Users, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Shield,
  Database,
  Clock
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: MessageSquare, label: 'Ask AI', href: '/chat' },
    { icon: AlertTriangle, label: 'Incidents', href: '/alerts' },
    { icon: Shield, label: 'Cases', href: '/incidents' },
    { icon: FileText, label: 'Knowledge', href: '/knowledge' },
    { icon: Database, label: 'Connectors', href: '/connectors' },
    { icon: Clock, label: 'Shift Summary', href: '/shift-summary' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Users, label: 'Workspaces', href: '/workspaces' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className={cn(
      "relative h-screen bg-cyber-darker border-r border-cyber-gunmetal transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-cyber-gunmetal">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center text-cyber-red hover:bg-cyber-gunmetal"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-cyber-gunmetal hover:text-white",
                      isActive 
                        ? "bg-cyber-red text-white" 
                        : "text-gray-300",
                      collapsed && "justify-center"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-cyber-gunmetal">
          <div className={cn(
            "flex items-center space-x-3",
            collapsed && "justify-center"
          )}>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            {!collapsed && (
              <div>
                <p className="text-xs text-gray-400">System Status</p>
                <p className="text-xs text-green-500">All Systems Operational</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
