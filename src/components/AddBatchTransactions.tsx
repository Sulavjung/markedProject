import { CopyPlus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddTransactionForm } from "./AddTransaction";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

function AddBatchTransactions() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  return (
    <Drawer open={showAddTransaction} onOpenChange={setShowAddTransaction}>
      <DrawerTrigger>
        <TooltipProvider delayDuration={700}>
        <Tooltip>
          <TooltipTrigger>
            <Button>
              <CopyPlus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add batch transactions.</p>
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add batch transactions</DrawerTitle>
            <DrawerDescription>
              Export your transaction from an account in .csv file with columns of <strong>name</strong>,
              <strong>date</strong>, <strong>type of withdrawal or deposit</strong>, and <strong>amount</strong>.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 py-0 mb-0">
            <AddTransactionForm setShowAddTransaction={setShowAddTransaction} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default AddBatchTransactions;
