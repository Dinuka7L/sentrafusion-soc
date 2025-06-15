
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
      {/* Make this container fill available viewport height (minus header/sidebar) */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-[calc(100vh-48px)]">
        {/* Demo: Left - fill height, flex */}
        <div className="w-full md:w-[32%] flex flex-col min-h-0 flex-1">
          <TeamFilter selectedTeam={selectedTeam} onSelect={setSelectedTeam} />
          {/* Make DemoShiftSummaryList fill remaining height using flex-1 and min-h-0 */}
          <div className="flex-1 min-h-0">
            <DemoShiftSummaryList selectedTeam={selectedTeam} />
          </div>
        </div>

        {/* Real data: Right - fill height, flex */}
        <div className="w-full md:w-[68%] flex flex-col min-h-0 flex-1">
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
          {/* Fill available height, allow scrolling */}
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full pr-2">
              <ShiftSummaryList />
            </ScrollArea>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShiftSummaryPage;

