
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ShiftSummaryList from '@/components/shift-summary/ShiftSummaryList';
import DemoShiftSummaryList from '@/components/shift-summary/DemoShiftSummaryList';
import TeamFilter from '@/components/shift-summary/TeamFilter';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const ShiftSummaryPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Demo: Left - now with team filter */}
        <div className="w-full md:w-[32%]">
          <TeamFilter selectedTeam={selectedTeam} onSelect={setSelectedTeam} />
          <DemoShiftSummaryList selectedTeam={selectedTeam} />
        </div>
        {/* Real data: Right - scrollable and wider */}
        <div className="w-full md:w-[68%]">
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
          <ScrollArea className="h-[calc(100vh-210px)] pr-2">
            <ShiftSummaryList />
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default ShiftSummaryPage;
