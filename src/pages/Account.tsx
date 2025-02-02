import AddBatchTransactions from "@/components/AddBatchTransactions";
import AddTransaction from "@/components/AddTransaction";
import { Icons } from "@/components/icons";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AccountTransaction,
  Account,
  getAllDataOnBankAccount,
} from "@/store/slices/bankingSlice";
import { Icon, IdCardIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig: ChartConfig = {
  balance: {
    label: "Balance",
    color: "#000000",
  },
};

const transactionConfig: ChartConfig = {
  transactionAmount: {
    label: "Transaction",
    color: "orange",
  }
}

function AccountPage() {
  const { accountId } = useParams();

  if (accountId) {
    const { account, transactions } = useSelector(
      getAllDataOnBankAccount(accountId)
    );

    console.log(account, transactions);

    const bankAccount = new BankAccount(account, transactions);

    if (account && transactions) {
      return (
        <div className="p-md-4">
          <PageHeader>
            <PageHeaderHeading className="w-full">
              <IdCardIcon color="green" size={40} />
              <span className="p-1 block"></span>
              <div className="flex flex-row justify-between ">
                <div>{account.name}</div>

                <div className="flex flex-row gap-2">
                <AddTransaction />
                <AddBatchTransactions />
                </div>
              </div>
            </PageHeaderHeading>
          </PageHeader>
          <div className="flex flex-col items-stretch sm:flex-row gap-4 ">
          <Card className="mb-4 flex flex-1 flex-col">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
              <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>Balance</CardTitle>
                <CardDescription>
                  Your change in balance over time.
                </CardDescription>
              </div>
              <div className="flex">
                <button
                  key={account.name}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  /* onClick={() => setActiveChart(chart)} */
                >
                  <span className="text-xs text-muted-foreground">Balance</span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {account.balance}
                  </span>
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[100px] w-full max-h-[300px]"
              >
                <AreaChart
                  accessibilityLayer
                  data={bankAccount.getDailyBalances()}
                >
                  <defs>
                    <linearGradient
                      id="balanceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    dataKey="balance"
                    type="monotone"
                    fill="url(#balanceGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="mb-4 flex flex-1 flex-col">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
              <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>Transactions Each Day</CardTitle>
                <CardDescription>
                  Your transactions over each day.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={transactionConfig}
                className="min-h-[100px] w-full max-h-[300px]"
              >
              <BarChart
                accessibilityLayer
                data={bankAccount.getDailyTransactions()}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="transactionAmount"
                  fill="orange"
                  radius={4}
                />
              </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {transaction.name}
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${transaction.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
  return <div>Account</div>;
}

export default AccountPage;

class BankAccount {
  account: Account;
  transactions: AccountTransaction[];

  constructor(account?: Account, transactions?: AccountTransaction[]) {
    this.account = account || { id: "", name: "", type: "debit", balance: 0 };
    this.transactions = transactions || [
      {
        id: "",
        name: "",
        account_id: "",
        type: "deposit",
        amount: 0,
        date: "",
      },
    ];
  }

  setBankAccount(account: Account) {
    this.account = account;
  }

  setTransactions(transactions: AccountTransaction[]) {
    this.transactions = transactions;
  }

  //Get amount spent in each month. should return[{month: " ", amountSpent: number}]

  //Get account balance every day. should return [{day: " ", balance: number}]
  getMonthlySpending() {
    const monthlySpending: { month: string; amountSpent: number }[] = [];

    this.transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "long",
      });
      const existingMonth = monthlySpending.find((m) => m.month === month);

      if (existingMonth) {
        existingMonth.amountSpent += transaction.amount;
      } else {
        monthlySpending.push({ month, amountSpent: transaction.amount });
      }
    });

    return monthlySpending;
  }

  getDailyBalances() {
    const dailyBalances: { day: string; balance: number }[] = [];
    let lastBalance = this.account.balance;

    this.transactions.forEach((transaction) => {
      lastBalance +=
        transaction.type === "deposit"
          ? -transaction.amount
          : transaction.amount;
    });

    const date = new Date();
    dailyBalances.push({
      day: `${date.toDateString()}`,
      balance: lastBalance,
    });

    this.transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const day = `${date.toDateString()}`;
      lastBalance +=
        transaction.type === "deposit"
          ? transaction.amount
          : -transaction.amount;

      dailyBalances.push({ day: day, balance: lastBalance });
    });

    return dailyBalances;
  }


  getDailyTransactions(){
    const dailyTransactions: {date: string; transactionAmount: number}[] = [];

    this.transactions.forEach((transaction) => {
      dailyTransactions.push({ 
        date: new Date(transaction.date).toDateString(), 
        transactionAmount: transaction.type === "deposit" ? transaction.amount : -transaction.amount 
      }); //if withdraw, show -ve, if deposit show +ve
    })

    console.log(dailyTransactions);

    return dailyTransactions;
  }
}
