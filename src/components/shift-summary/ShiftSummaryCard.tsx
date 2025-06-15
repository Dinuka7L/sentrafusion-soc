
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShiftSummary } from '@/types';
import { format } from 'date-fns';

const ShiftSummaryCard = ({ summary }: { summary: ShiftSummary }) => (
  <Card className="bg-cyber-darker border-cyber-gunmetal text-white hover:border-cyber-red transition">
    <CardHeader>
      <CardTitle>
        {summary.shift_date ? format(new Date(summary.shift_date), 'PPP') : 'No Date'}
        <span className="ml-3 text-sm text-gray-400 font-normal">
          v{summary.version}
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div>
        <span className="font-semibold">Shift Lead:</span>{" "}
        {summary.shift_lead_name ?? <span className="text-gray-400">N/A</span>}
      </div>
      <div className="text-sm mt-2 text-gray-300 line-clamp-2">
        {summary.team_notes ?? <i>No notes</i>}
      </div>
      {summary.file_attachment_path && (
        <a
          href={`https://dzksaffvtjbqfptdnbcd.supabase.co/storage/v1/object/public/shift_attachments/${summary.file_attachment_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyber-red underline text-xs mt-2 block"
        >
          Download Attachment
        </a>
      )}
    </CardContent>
  </Card>
);

export default ShiftSummaryCard;
