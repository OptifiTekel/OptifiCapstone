"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download } from "lucide-react";
import ReceiptScanner from "@/components/ReceiptScanner";
import ExpenseChart from "@/components/ExpenseChart";
import BudgetInsights from "@/components/BudgetInsights";
import RecentTransactions from "@/components/RecentTransactions";

interface InteractiveDashboardProps {
  user: {
    name: string;
    monthlyBudget: number;
    occupation: string;
    financialGoal: string;
  };
  financialData: {
    totalSpent: number;
    remainingBudget: number;
    budgetProgress: number;
    monthlyChange: number;
    categories: Array<{
      name: string;
      amount: number;
      percentage: number;
      color: string;
    }>;
    recentTransactions: Array<{
      id: number;
      description: string;
      amount: number;
      category: string;
      date: string;
      type: "expense" | "income";
    }>;
  };
}

export default function InteractiveDashboard({
  user,
  financialData,
}: InteractiveDashboardProps) {
  const [showScanner, setShowScanner] = useState(false);

  // Add a currency formatting helper at the top of the component
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
      {/* Spending Overview Section */}
      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Spending Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending by Category */}
          <div className="lg:col-span-2">
            <ExpenseChart categories={financialData.categories} />
          </div>
          {/* Financial Data Cards */}
          <div className="flex flex-col gap-6">
            {/* Total Spent */}
            <div className="shadow-sm hover:shadow-md transition-shadow rounded-lg bg-white p-4">
              <div className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium text-slate-600">
                  Total Spent
                </span>
                <Upload className="h-4 w-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency(financialData.totalSpent)}
              </div>
              <p className="text-xs text-red-600 flex items-center mt-1">
                +{financialData.monthlyChange}% from last month
              </p>
            </div>
            {/* Remaining Budget */}
            <div className="shadow-sm hover:shadow-md transition-shadow rounded-lg bg-white p-4">
              <div className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium text-slate-600">
                  Remaining Budget
                </span>
                <Download className="h-4 w-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency(financialData.remainingBudget)}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {(
                  (financialData.remainingBudget / user.monthlyBudget) *
                  100
                ).toFixed(1)}
                % of budget left
              </p>
            </div>
            {/* Budget Progress */}
            <div className="shadow-sm hover:shadow-md transition-shadow rounded-lg bg-white p-4">
              <div className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium text-slate-600">
                  Budget Progress
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2">
                {financialData.budgetProgress}%
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${financialData.budgetProgress}%` }}
                ></div>
              </div>
            </div>
            {/* Receipts Scanned */}
            <div className="shadow-sm hover:shadow-md transition-shadow rounded-lg bg-white p-4">
              <div className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium text-slate-600">
                  Receipts Scanned
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">27</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                +5 this week
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Insights Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Personalized Insights
        </h2>
        <BudgetInsights user={user} financialData={financialData} />
      </section>
      {/* Receipt Scanner Modal */}
      {showScanner && <ReceiptScanner onClose={() => setShowScanner(false)} />}
    </>
  );
}
