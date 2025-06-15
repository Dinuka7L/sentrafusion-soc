
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ShiftSummaryList from '@/components/shift-summary/ShiftSummaryList';
import DemoShiftSummaryList from '@/components/shift-summary/DemoShiftSummaryList';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const ShiftSummaryPage = () => {
  const [open, setOpen] = useState(false);

  // Responsive: column on mobile, row with two columns on desktop
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Demo section (left) */}
        <div className="w-full md:w-1/2">
          <DemoShiftSummaryList />
        </div>
        {/* Real data section (right) */}
        <div className="w-full md:w-1/2">
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
                <ShiftSummaryList />
              </SheetContent>
            </Sheet>
          </div>
          <ShiftSummaryList />
        </div>
      </div>
    </Layout>
  );
};

export default ShiftSummaryPage;
