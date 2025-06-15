
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ShiftSummaryCard from './ShiftSummaryCard';
import { ShiftSummary } from '@/types';

const fetchShiftSummaries = async (): Promise<ShiftSummary[]> => {
  const { data, error } = await supabase
    .from('shift_summaries')
    .select('*')
    .order('shift_date', { ascending: false })
    .limit(10);
  if (error) throw error;
  return data as ShiftSummary[];
};

const ShiftSummaryList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['shift_summaries'],
    queryFn: fetchShiftSummaries,
  });

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading shift summaries</div>;
  if (!data?.length) return <div className="text-gray-400">No shift summaries found.</div>;

  return (
    <div className="grid gap-4">
      {data.map(summary => (
        <ShiftSummaryCard key={summary.id} summary={summary} />
      ))}
    </div>
  );
};

export default ShiftSummaryList;
