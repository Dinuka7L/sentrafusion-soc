
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ShiftSummaryList from '@/components/shift-summary/ShiftSummaryList';
import ShiftSummaryForm from '@/components/shift-summary/ShiftSummaryForm';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const ShiftSummaryPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Shift Summaries</h1>
          <p className="text-gray-400 text-sm">Document and review SOC handoffs and shift notes.</p>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="bg-cyber-red text-white hover:bg-cyber-red-dark">+ New Summary</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-lg">
            <SheetHeader>
              <SheetTitle>Create Shift Summary</SheetTitle>
            </SheetHeader>
            <ShiftSummaryForm onSuccess={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <ShiftSummaryList />
    </Layout>
  );
};

export default ShiftSummaryPage;
