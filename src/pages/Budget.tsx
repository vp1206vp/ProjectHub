import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Plus, X, Edit2 } from 'lucide-react';

interface Transaction {
  id: number;
  description: string;
  category: string;
  date: string;
  amount: number;
}

interface BudgetData {
  month: string;
  planned: number;
  actual: number;
}

const Budget = () => {
  const [budgetData, setBudgetData] = useState<BudgetData[]>([
    { month: 'Jan', planned: 50000, actual: 48000 },
    { month: 'Feb', planned: 45000, actual: 46000 },
    { month: 'Mar', planned: 55000, actual: 52000 },
    { month: 'Apr', planned: 60000, actual: 58000 },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: 'Software Licenses',
      category: 'Technology',
      date: '2024-03-15',
      amount: 12000,
    },
    {
      id: 2,
      description: 'Team Training',
      category: 'Education',
      date: '2024-03-12',
      amount: 5000,
    },
  ]);

  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showEditBudget, setShowEditBudget] = useState(false);
  const [editingMonth, setEditingMonth] = useState<BudgetData | null>(null);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    category: '',
    date: '',
    amount: 0,
  });

  const totalBudget = budgetData.reduce((sum, item) => sum + item.planned, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.actual, 0);
  const remaining = totalBudget - totalSpent;
  const variance = ((totalSpent - totalBudget) / totalBudget) * 100;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction: Transaction = {
      id: transactions.length + 1,
      ...newTransaction,
    };
    setTransactions([...transactions, transaction]);
    setNewTransaction({ description: '', category: '', date: '', amount: 0 });
    setShowAddTransaction(false);

    // Update actual spending in budget data
    const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    setBudgetData(prevData =>
      prevData.map(item =>
        item.month === transactionMonth
          ? { ...item, actual: item.actual + transaction.amount }
          : item
      )
    );
  };

  const handleEditBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMonth) {
      setBudgetData(prevData =>
        prevData.map(item =>
          item.month === editingMonth.month ? editingMonth : item
        )
      );
      setEditingMonth(null);
      setShowEditBudget(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Budget Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowAddTransaction(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Transaction
          </button>
          <button
            onClick={() => setShowEditBudget(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <Edit2 className="w-4 h-4 inline mr-2" />
            Edit Budget
          </button>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Budget</p>
              <p className="text-2xl font-semibold text-gray-900">${totalBudget.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Spent</p>
              <p className="text-2xl font-semibold text-gray-900">${totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Remaining</p>
              <p className="text-2xl font-semibold text-gray-900">${remaining.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Variance</p>
              <p className="text-2xl font-semibold text-gray-900">{variance.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Budget vs Actual Spending</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="planned" stroke="#4F46E5" name="Planned" />
              <Line type="monotone" dataKey="actual" stroke="#10B981" name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Transaction</h2>
              <button onClick={() => setShowAddTransaction(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddTransaction(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Budget Modal */}
      {showEditBudget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Monthly Budget</h2>
              <button onClick={() => setShowEditBudget(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {budgetData.map((month) => (
                <div key={month.month} className="flex items-center space-x-4">
                  <span className="w-20">{month.month}</span>
                  <input
                    type="number"
                    value={month.planned}
                    onChange={(e) => {
                      setBudgetData(prevData =>
                        prevData.map(item =>
                          item.month === month.month
                            ? { ...item, planned: Number(e.target.value) }
                            : item
                        )
                      );
                    }}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditBudget(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;