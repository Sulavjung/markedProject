import React from "react";
import { useSelector } from "react-redux";
import {
  selectBankAccounts,
  selectAccountTransactions,
  selectInvestmentAccounts,
  selectInvestmentEntities,
  selectInvestmentTransactions,
} from "@/store/slices/bankingSlice"; // Adjust import based on your folder structure
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard: React.FC = () => {
  const bankAccounts = useSelector(selectBankAccounts);
  const accountTransactions = useSelector(selectAccountTransactions);
  const investmentAccounts = useSelector(selectInvestmentAccounts);
  const investmentEntities = useSelector(selectInvestmentEntities);
  const investmentTransactions = useSelector(selectInvestmentTransactions);

  // Calculate total balance across debit and credit accounts
  const calculateTotalBalance = () => {
    const debitTotal = bankAccounts
      .filter((account) => account.type === "debit")
      .reduce((sum, account) => sum + account.balance, 0);
    const creditTotal = bankAccounts
      .filter((account) => account.type === "credit")
      .reduce((sum, account) => sum + account.balance, 0);
    return debitTotal + creditTotal;
  };

  // Group investment entities by investment account id
  const groupedEntities: Record<string, any[]> = investmentAccounts.reduce(
    (acc: Record<string, any[]>, account) => {
      acc[account.id] = investmentEntities.filter(
        (entity) => entity.inevstmentAccount_id === account.id
      );
      return acc;
    },
    {}
  );

  // Function to calculate the total value of investment entities in each account
  const calculateInvestmentTotal = (entities: any[]) => {
    return entities.reduce((total, entity) => {
      const pricePerUnit = getPriceForEntity(entity.name); // Mock function to get price (you would replace this with API data)
      return total + pricePerUnit * entity.quantity;
    }, 0);
  };

  // Mock function to return price for each entity (replace with real data from API)
  const getPriceForEntity = (name: string) => {
    const prices: any = {
      AAPL: 150,
      TSLA: 700,
      BTC: 40000,
      ETH: 2500,
      "Vanguard S&P 500 ETF": 350,
    };
    return prices[name] || 0;
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Finance Dashboard
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Net Worth</CardTitle>
            <CardDescription>
              Your total valuation as of today's market and bank balance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              $
              {calculateInvestmentTotal(investmentEntities) +
                calculateTotalBalance()}
            </p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        {/* Bank Accounts Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bank Accounts
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Balance</th>
                <th className="py-2 px-4 text-left text-gray-600">Type</th>
              </tr>
            </thead>
            <tbody>
              {bankAccounts.map((account) => (
                <tr key={account.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{account.name}</td>
                  <td className="py-2 px-4">${account.balance}</td>
                  <td className="py-2 px-4">{account.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-lg font-semibold">
            Total Balance: ${calculateTotalBalance()}
          </p>
        </div>

        {/* Investment Entities in Each Investment Account Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Investment Entities in Each Investment Account
          </h2>
          {investmentAccounts.map((account) => {
            const entitiesInAccount = groupedEntities[account.id];
            const totalValue = calculateInvestmentTotal(entitiesInAccount);

            return (
              <div key={account.id} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  {account.name} ({account.icon})
                </h3>
                <table className="w-full table-auto mt-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left text-gray-600">
                        Entity Name
                      </th>
                      <th className="py-2 px-4 text-left text-gray-600">
                        Quantity
                      </th>
                      <th className="py-2 px-4 text-left text-gray-600">
                        Total Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {entitiesInAccount.map((entity) => (
                      <tr key={entity.id} className="border-t hover:bg-gray-50">
                        <td className="py-2 px-4">{entity.name}</td>
                        <td className="py-2 px-4">{entity.quantity}</td>
                        <td className="py-2 px-4">
                          ${getPriceForEntity(entity.name) * entity.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-lg font-semibold">
                  Total Value of Investments: ${totalValue}
                </p>
              </div>
            );
          })}
        </div>

        {/* Account Transactions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Transactions
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left text-gray-600">Date</th>
                <th className="py-2 px-4 text-left text-gray-600">Account</th>
                <th className="py-2 px-4 text-left text-gray-600">Type</th>
                <th className="py-2 px-4 text-left text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {accountTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{transaction.date}</td>
                  <td className="py-2 px-4">
                    {
                      bankAccounts.find(
                        (acc) => acc.id === transaction.account_id
                      )?.name
                    }
                  </td>
                  <td className="py-2 px-4">{transaction.type}</td>
                  <td className="py-2 px-4">${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Investment Transactions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Investment Transactions
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left text-gray-600">Date</th>
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Type</th>
                <th className="py-2 px-4 text-left text-gray-600">Quantity</th>
                <th className="py-2 px-4 text-left text-gray-600">Price At</th>
              </tr>
            </thead>
            <tbody>
              {investmentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{transaction.buyDate}</td>
                  <td className="py-2 px-4">{transaction.name}</td>
                  <td className="py-2 px-4">{transaction.type}</td>
                  <td className="py-2 px-4">{transaction.quantity}</td>
                  <td className="py-2 px-4">${transaction.pricedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
