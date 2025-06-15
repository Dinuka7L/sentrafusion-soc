
import React, { useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const ShiftSummaryAttachmentUpload = ({
  onUpload,
  onUploadStart,
  onUploadEnd,
  disabled,
}: {
  onUpload: (filePath: string) => void;
  onUploadStart: () => void;
  onUploadEnd: () => void;
  disabled?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUploadStart();
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('shift_attachments')
      .upload(fileName, file);
    onUploadEnd();
    if (error) {
      alert('Error uploading: ' + error.message);
      return;
    }
    if (data?.path) onUpload(data.path);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleFile}
        disabled={disabled}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        {disabled ? 'Uploading...' : 'Upload File'}
      </Button>
    </>
  );
};

export default ShiftSummaryAttachmentUpload;
