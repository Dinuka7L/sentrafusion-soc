
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ShiftSummaryList from '@/components/shift-summary/ShiftSummaryList';
import DemoShiftSummaryList from '@/components/shift-summary/DemoShiftSummaryList';
import TeamFilter from '@/components/shift-summary/TeamFilter';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';

const ShiftSummaryPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Demo: Left - now with team filter and manual entry */}
        <div className="w-full md:w-[32%]">
          <TeamFilter selectedTeam={selectedTeam} onSelect={setSelectedTeam} />
          <DemoShiftSummaryList selectedTeam={selectedTeam} />
        </div>

        {/* Real data: Right - just data and a compact new summary button */}
        <div className="w-full md:w-[68%] flex flex-col">
          <div className="flex items-center justify-end mb-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button 
                  className="bg-cyber-red text-white hover:bg-cyber-red-dark h-9 px-3 py-1 text-sm"
                  size="sm"
                  variant="default"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Summary
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-lg">
                <SheetHeader>
                  <SheetTitle>Create Shift Summary</SheetTitle>
                </SheetHeader>
                <ShiftSummaryList />
              </SheetContent>
            </Sheet>
          </div>
          <ScrollArea className="h-[calc(100vh-110px)] pr-2">
            <ShiftSummaryList />
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default ShiftSummaryPage;
