import { PlusSquareIcon } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";

const formSchema = z.object({
  name: z.string().nonempty(""),
  type: z.string().nonempty(""),
  date: z.string().nonempty(""),
  amount: z.number().nonnegative(),
});

export default function AddTransaction() {
  const { accountId } = useParams();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Drawer open={showAddTransaction} onOpenChange={setShowAddTransaction}>
      <DrawerTrigger>
        <PlusSquareIcon />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Transaction</DrawerTitle>
            <DrawerDescription>
              Add recent changes to the account.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Form {...form}>
              <form>
                <Label>Name</Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input
                          {...field}
                          autoFocus
                          placeholder="Name of Transaction"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Label>Date</Label>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input {...field} placeholder="Date of Transaction" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Label>Amount</Label>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input {...field} placeholder="Amount" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Label>Amount</Label>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input {...field} placeholder="Amount" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
