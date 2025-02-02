import { loadInitialState } from "@/utils/localStorage";
import { createSelector, createSlice } from "@reduxjs/toolkit";

export interface Banking {
  bankAccounts: Account[];
  accountTransactions: AccountTransaction[];
  investmentAccounts: InvestmentAccount[];
  investmentEntities: InvestmentEntities[];
  investmentTransaction: InvestmentTransaction[];
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: "debit" | "credit";
}

export interface AccountTransaction {
  id: string;
  name: string;
  account_id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  date: string;
}

interface InvestmentAccount {
  id: string;
  name: string;
  icon: string;
}

interface InvestmentEntities {
  id: string;
  name: string;
  inevstmentAccount_id: string;
  quantity: number;
  categories: string[];
}

interface InvestmentTransaction {
  id: string;
  name: string;
  investmentEntities_id: string;
  type: "buy" | "sell";
  quantity: number;
  pricedAt: number;
  buyDate: string;
}

/* const defaultBankingState: Banking = {
  bankAccounts: [],
  accountTransactions: [],
  investmentAccounts: [],
  investmentEntities: [],
  investmentTransaction: [],
}; */

const defaultBankingState: Banking = {
  bankAccounts: [
    { id: "1", name: "Chase Checking", balance: 5000, type: "debit" },
    { id: "2", name: "Wells Fargo Savings", balance: 10000, type: "debit" },
    { id: "3", name: "Amex Platinum", balance: -2500, type: "credit" },
    { id: "4", name: "Chase Freedom", balance: -800, type: "credit" },
  ],
  accountTransactions: [
    {
      id: "101",
      name: "Salary Deposit",
      account_id: "1",
      type: "deposit",
      amount: 4000,
      date: "2024-01-01",
    },
    {
      id: "102",
      name: "Grocery Shopping",
      account_id: "1",
      type: "withdrawal",
      amount: 500,
      date: "2024-01-05",
    },
    {
      id: "103",
      name: "Utility Bill Payment",
      account_id: "1",
      type: "withdrawal",
      amount: 200,
      date: "2024-01-10",
    },
    {
      id: "104",
      name: "Restaurant",
      account_id: "1",
      type: "withdrawal",
      amount: 150,
      date: "2024-02-02",
    },
    {
      id: "105",
      name: "Gym Membership",
      account_id: "1",
      type: "withdrawal",
      amount: 50,
      date: "2024-03-15",
    },

    {
      id: "201",
      name: "Interest Credit",
      account_id: "2",
      type: "deposit",
      amount: 100,
      date: "2024-01-25",
    },
    {
      id: "202",
      name: "Savings Transfer",
      account_id: "2",
      type: "withdrawal",
      amount: 500,
      date: "2024-02-10",
    },
    {
      id: "203",
      name: "Investment Return",
      account_id: "2",
      type: "deposit",
      amount: 2000,
      date: "2024-03-20",
    },

    {
      id: "301",
      name: "Credit Card Payment",
      account_id: "3",
      type: "withdrawal",
      amount: 1200,
      date: "2024-01-12",
    },
    {
      id: "302",
      name: "Shopping at Amazon",
      account_id: "3",
      type: "withdrawal",
      amount: 800,
      date: "2024-01-20",
    },
    {
      id: "303",
      name: "Cashback Reward",
      account_id: "3",
      type: "deposit",
      amount: 50,
      date: "2024-02-05",
    },
    {
      id: "304",
      name: "Bonus Cashback",
      account_id: "3",
      type: "deposit",
      amount: 100,
      date: "2024-03-01",
    },

    {
      id: "401",
      name: "Airline Ticket Purchase",
      account_id: "4",
      type: "withdrawal",
      amount: 300,
      date: "2024-02-14",
    },
    {
      id: "402",
      name: "Dining Out",
      account_id: "4",
      type: "withdrawal",
      amount: 60,
      date: "2024-02-18",
    },
    {
      id: "403",
      name: "Credit Card Interest",
      account_id: "4",
      type: "withdrawal",
      amount: 25,
      date: "2024-03-10",
    },
    {
      id: "404",
      name: "Reward Points Cashback",
      account_id: "4",
      type: "deposit",
      amount: 30,
      date: "2024-03-25",
    },
  ],
  investmentAccounts: [
    { id: "10", name: "Robinhood", icon: "📈" },
    { id: "11", name: "Coinbase", icon: "💰" },
    { id: "12", name: "Fidelity 401k", icon: "🏦" },
  ],
  investmentEntities: [
    {
      id: "201",
      name: "AAPL",
      inevstmentAccount_id: "10",
      quantity: 15,
      categories: ["stock"],
    },
    {
      id: "202",
      name: "TSLA",
      inevstmentAccount_id: "10",
      quantity: 8,
      categories: ["stock"],
    },
    {
      id: "203",
      name: "BTC",
      inevstmentAccount_id: "11",
      quantity: 1.2,
      categories: ["crypto"],
    },
    {
      id: "204",
      name: "ETH",
      inevstmentAccount_id: "11",
      quantity: 5,
      categories: ["crypto"],
    },
    {
      id: "205",
      name: "Vanguard S&P 500 ETF",
      inevstmentAccount_id: "12",
      quantity: 20,
      categories: ["ETF"],
    },
  ],
  investmentTransaction: [
    {
      id: "301",
      name: "AAPL",
      investmentEntities_id: "201",
      type: "buy",
      quantity: 10,
      pricedAt: 150,
      buyDate: "2024-01-10",
    },
    {
      id: "302",
      name: "TSLA",
      investmentEntities_id: "202",
      type: "buy",
      quantity: 5,
      pricedAt: 700,
      buyDate: "2024-01-15",
    },
    {
      id: "303",
      name: "BTC",
      investmentEntities_id: "203",
      type: "buy",
      quantity: 0.5,
      pricedAt: 40000,
      buyDate: "2024-01-20",
    },
    {
      id: "304",
      name: "AAPL",
      investmentEntities_id: "201",
      type: "sell",
      quantity: 2,
      pricedAt: 180,
      buyDate: "2024-01-25",
    },
    {
      id: "305",
      name: "ETH",
      investmentEntities_id: "204",
      type: "buy",
      quantity: 3,
      pricedAt: 2500,
      buyDate: "2024-02-01",
    },
  ],
};

const initialState: Banking = loadInitialState("Finance", defaultBankingState);

const financeSlice = createSlice({
  name: "Finance",
  initialState: initialState,
  reducers: {},
});

export default financeSlice.reducer;
// Selectors
const selectAllBankingData = (state: { finance: Banking }) => state;
export const selectBankAccounts = (state: { finance: Banking }) =>
  selectAllBankingData(state).finance.bankAccounts;

export const selectAccountTransactions = (state: { finance: Banking }) =>
  selectAllBankingData(state).finance.accountTransactions;

// New selector to get account data and related transactions
export const getAllDataOnBankAccount = (account_id: string) =>
  createSelector(
    [selectBankAccounts, selectAccountTransactions],
    (bankAccounts, accountTransactions) => {
      const account = bankAccounts.find((acc) => acc.id === account_id);
      const transactions = accountTransactions.filter(
        (tx) => tx.account_id === account_id
      );
      return { account, transactions };
    }
  );

export const selectInvestmentAccounts = (state: { finance: Banking }) =>
  selectAllBankingData(state).finance.investmentAccounts;

export const selectInvestmentEntities = (state: { finance: Banking }) =>
  selectAllBankingData(state).finance.investmentEntities;

export const selectInvestmentTransactions = (state: { finance: Banking }) =>
  selectAllBankingData(state).finance.investmentTransaction;
