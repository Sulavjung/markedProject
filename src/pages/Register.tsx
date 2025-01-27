import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  selectRegisterData,
  selectToday,
  updateRegisterData,
} from "@/store/slices/exampleSlices";
import { zodResolver } from "@hookform/resolvers/zod";
import { SidebarCloseIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { date, z } from "zod";

export interface Bill {
  id: string;
  name: string;
  value: number;
  quantity: number;
}

export interface registerConfig {
  date: string;
  startingBalance: number;
  bills: Bill[];
  expectedDeposit: number;
  grossSale: number;
  scratcher: number;
}

export const Bills: Bill[] = [
  {
    id: "penny",
    name: "Penny",
    value: 0.01,
    quantity: 0,
  },
  {
    id: "nickel",
    name: "Nickel",
    value: 0.05,
    quantity: 0,
  },
  {
    id: "dime",
    name: "Dime",
    value: 0.1,
    quantity: 0,
  },
  {
    id: "quarter",
    name: "Quarter",
    value: 0.25,
    quantity: 0,
  },
  {
    id: "half_dollar",
    name: "Half Dollar",
    value: 0.5,
    quantity: 0,
  },
  {
    id: "one_dollar",
    name: "One Dollar",
    value: 1.0,
    quantity: 0,
  },
  {
    id: "five_dollars",
    name: "Five Dollars",
    value: 5.0,
    quantity: 0,
  },
  {
    id: "ten_dollars",
    name: "Ten Dollars",
    value: 10.0,
    quantity: 0,
  },
  {
    id: "twenty_dollars",
    name: "Twenty Dollars",
    value: 20.0,
    quantity: 0,
  },
  {
    id: "fifty_dollars",
    name: "Fifty Dollars",
    value: 50.0,
    quantity: 0,
  },
  {
    id: "hundred_dollars",
    name: "Hundred Dollars",
    value: 100.0,
    quantity: 0,
  },
];

// Bill Schema
const billSchema = z.object({
  id: z.string(), // Unique identifier for each bill
  name: z.string(), // Name of the bill
  value: z.number().min(0), // The monetary value of the bill (must be positive)
  quantity: z.number().min(0, "Quantity cannot be negative"), // Quantity (non-negative)
});

// Register Config Schema
const registerSchema = z.object({
  startingBalance: z.number().min(0),
  bills: z.array(billSchema), // Array of bills
  expectedDeposit: z.number().min(0, "Expected Deposit cannot be negative."),
  grossSale: z.number().min(0, "Gross sale cannot be negative"),
  scratcher: z.number().min(0, "Scratcher Sale for the day."),
});

// Inferred Type
type RegisterConfig = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { dateId } = useParams(); // Access the route param
  const navigate = useNavigate(); // To programmatically navigate
  const dispatch = useDispatch();

  const registerData = useSelector(selectRegisterData);
  const todayRegisterData = useSelector(selectToday);

  // Define the form at the top level of the component
  const form = useForm<RegisterConfig>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      bills: [],
    },
  });

  useEffect(() => {
    if (dateId) {
      // Check if the register data exists for the given `dateId`
      const paramDateRegisterData = registerData.find(
        (register) => dateId === register.date
      );

      if (paramDateRegisterData) {
        // Populate the form with matched data
        const { date, ...formInitial } = paramDateRegisterData;
        form.reset(formInitial); // Reset form values with the matched data
      } else {
        // Show error and navigate to a fallback route
        toast.error("The data for the date does not exist.");
        navigate("/app/home");
      }
    } else {
      // Use today's register data as the default values
      const { date, ...formInitial } = todayRegisterData;
      form.reset(formInitial); // Reset form values with today's data
    }
  }, [dateId, form, navigate]);

  const [formData, setFormData] = useState<RegisterConfig | null>(null);

  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    var date = dateId ? dateId : new Date().toLocaleDateString().replace(/\//g, "-");
    const registerData: registerConfig = {
      date: date, // Replace slashes with dashes
      ...values,
    };

    dispatch(updateRegisterData(registerData));
    console.log("Submitted data: ", registerData);
  }
  const handleQuantityChange = (index: number, value: number) => {
    form.setValue(`bills.${index}.quantity`, value);
  };

  /*   // Inside Register component
  const formDatas = form.watch(); // Get all current form data

  useEffect(() => {
    console.log(formDatas); // Logs the data whenever it changes
  }, [formDatas]); */

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>
          Register
          {/* <SidebarCloseIcon size={29} onClick={() => sidebar.toggleSidebar()} /> */}
        </PageHeaderHeading>
      </PageHeader>
      <div className="flex flex-row gap-2 mb-4">
      {registerData.map((register) => (
        <Button asChild size={"sm"} className={`${dateId === register.date ? "bg-red-500" : ""}`}>
        <Link to={`/app/register/${register.date}`}>{register.date}</Link>
      </Button>
      ))}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="startingBalance"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Starting Balance</FormLabel>

                <Input
                  {...field}
                  type="number"
                  placeholder="Starting Balance"
                  className="w-full"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />

                <FormMessage />
              </FormItem>
            )}
          />
          <Table className="mb-10">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Bills</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {form.watch("bills").map((bill, index) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.name}</TableCell>
                  <TableCell className="text-right">${bill.value}</TableCell>
                  <TableCell className="text-right">
                    <FormItem className="flex flex-row align-center justify-between">
                      <FormControl>
                        <Controller
                          name={`bills.${index}.quantity` as const}
                          control={form.control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              inputMode="numeric"
                              type="number"
                              placeholder={`Enter quantity for ${bill.name}`}
                              onChange={(e) =>
                                handleQuantityChange(
                                  index,
                                  Number(e.target.value)
                                )
                              }
                              className="w-full"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    ${(bill.value * bill.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Expected Deposit */}
          <FormField
            control={form.control}
            name="expectedDeposit"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Expected Deposit</FormLabel>

                <Input
                  {...field}
                  inputMode="decimal"
                  type="number"
                  placeholder="Expected Deposit"
                  className="w-full"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grossSale"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Gross Sale</FormLabel>
                <Input
                  {...field}
                  inputMode="decimal"
                  type="number"
                  placeholder="Gross Sale"
                  className="w-full"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
                <FormDescription>Sale of the day.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scratcher"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Gross Sale</FormLabel>
                <Input
                  {...field}
                  inputMode="decimal"
                  type="number"
                  placeholder="Scratcher"
                  className="w-full"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
                <FormDescription>Scratcher Sale of the day.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="mt-4 w-full mb-20">
            Submit
          </Button>

          {/* Display Submitted Data */}
          {formData && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h4 className="font-bold">Submitted Data</h4>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default Register;
