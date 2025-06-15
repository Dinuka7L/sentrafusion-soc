
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert } from '@/types';
import { Clock, User, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  alert: Alert;
  onInvestigate?: (alert: Alert) => void;
  onAssign?: (alert: Alert) => void;
}

const AlertCard = ({ alert, onInvestigate, onAssign }: AlertCardProps) => {
  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      case 'info': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'investigating': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'false-positive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className={cn(
      "bg-cyber-darker border-cyber-gunmetal hover:border-cyber-red transition-all duration-200"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className={getSeverityColor(alert.severity)}>
                {alert.severity.toUpperCase()}
              </Badge>
              <Badge variant="outline" className={getStatusColor(alert.status)}>
                {alert.status.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
          </div>
          <div className="flex flex-col items-end text-xs text-gray-400">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {alert.timestamp.toLocaleTimeString()}
            </span>
            <span className="mt-1">{alert.source}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm">{alert.description}</p>
        
        {alert.assignee && (
          <div className="flex items-center text-sm text-gray-400">
            <User className="h-4 w-4 mr-2" />
            Assigned to: <span className="text-white ml-1">{alert.assignee.name}</span>
          </div>
        )}

        {alert.iocs && alert.iocs.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">IOCs:</h4>
            <div className="flex flex-wrap gap-1">
              {alert.iocs.slice(0, 3).map(ioc => (
                <Badge key={ioc.id} variant="outline" className="text-xs">
                  {ioc.type}: {ioc.value.substring(0, 20)}...
                </Badge>
              ))}
              {alert.iocs.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{alert.iocs.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button 
            size="sm" 
            onClick={() => onInvestigate?.(alert)}
            className="bg-cyber-red hover:bg-cyber-red-dark text-white"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Investigate
          </Button>
          {!alert.assignee && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onAssign?.(alert)}
              className="border-cyber-gunmetal text-gray-300 hover:bg-cyber-gunmetal"
            >
              Assign to Me
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
