
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ShiftSummaryAttachmentUpload from './ShiftSummaryAttachmentUpload';

const initialState = {
  shift_date: '',
  shift_lead_name: '',
  team_notes: '',
  file_attachment_path: null as string | null,
};

const ShiftSummaryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('shift_summaries').insert([{
        shift_date: form.shift_date,
        shift_lead_name: form.shift_lead_name,
        team_notes: form.team_notes,
        file_attachment_path: form.file_attachment_path,
        // Add user id for created_by if available
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      setForm(initialState);
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ['shift_summaries'] });
    },
  });

  const onUpload = (filePath: string) => {
    setForm(f => ({ ...f, file_attachment_path: filePath }));
  };

  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <div>
        <label className="text-sm text-gray-200">Shift Date</label>
        <Input
          type="date"
          required
          value={form.shift_date}
          onChange={e => setForm(f => ({ ...f, shift_date: e.target.value }))}
        />
      </div>
      <div>
        <label className="text-sm text-gray-200">Shift Lead Name</label>
        <Input
          type="text"
          value={form.shift_lead_name}
          onChange={e => setForm(f => ({ ...f, shift_lead_name: e.target.value }))}
          placeholder="Name (optional)"
        />
      </div>
      <div>
        <label className="text-sm text-gray-200">Team Notes</label>
        <Textarea
          rows={3}
          value={form.team_notes}
          onChange={e => setForm(f => ({ ...f, team_notes: e.target.value }))}
          placeholder="Summarize the key events for this shift..."
        />
      </div>
      <div>
        <label className="text-sm text-gray-200">Attach File (optional)</label>
        <ShiftSummaryAttachmentUpload
          onUpload={onUpload}
          disabled={uploading}
          onUploadStart={() => setUploading(true)}
          onUploadEnd={() => setUploading(false)}
        />
        {form.file_attachment_path && (
          <div className="text-green-400 text-xs mt-1">
            File uploaded: {form.file_attachment_path}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={mutation.isPending || uploading}
      >
        {mutation.isPending ? 'Saving...' : 'Save'}
      </Button>
      {mutation.error && (
        <div className="text-sm text-destructive mt-2">
          Error: {(mutation.error as Error).message}
        </div>
      )}
    </form>
  );
};

export default ShiftSummaryForm;
