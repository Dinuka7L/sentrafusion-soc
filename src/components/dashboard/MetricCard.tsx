
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  className?: string;
}

const MetricCard = ({ title, value, change, changeType = 'neutral', icon: Icon, className }: MetricCardProps) => {
  return (
    <Card className={cn("bg-cyber-darker border-cyber-gunmetal", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <Icon className="h-4 w-4 text-cyber-red" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            changeType === 'positive' && "text-green-500",
            changeType === 'negative' && "text-red-500",
            changeType === 'neutral' && "text-gray-400"
          )}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
