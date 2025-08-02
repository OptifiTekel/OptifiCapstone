"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import InteractiveDashboard from "@/components/client/InteractiveDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
        setAuthChecked(true);
        setUser({
          name:
            data.session.user.user_metadata?.name ||
            data.session.user.email?.split("@")[0] ||
            "User",
          monthlyBudget: 2500,
          occupation: "Software Developer",
          financialGoal: "savings",
        });
      }
    });
  }, [router]);

  // Mock financial data - replace with real API calls as needed
  const financialData = {
    totalSpent: 1847.32,
    remainingBudget: 652.68,
    budgetProgress: 73.9,
    monthlyChange: 8.5,
    categories: [
      {
        name: "Food & Dining",
        amount: 567.45,
        percentage: 30.7,
        color: "bg-blue-500",
      },
      {
        name: "Transportation",
        amount: 289.2,
        percentage: 15.7,
        color: "bg-green-500",
      },
      {
        name: "Shopping",
        amount: 456.78,
        percentage: 24.7,
        color: "bg-purple-500",
      },
      {
        name: "Bills & Utilities",
        amount: 334.67,
        percentage: 18.1,
        color: "bg-orange-500",
      },
      {
        name: "Entertainment",
        amount: 199.22,
        percentage: 10.8,
        color: "bg-pink-500",
      },
    ],
    recentTransactions: [
      {
        id: 1,
        description: "Grocery Store",
        amount: 67.45,
        category: "Food & Dining",
        date: "2025-01-15",
        type: "expense" as const,
      },
      {
        id: 2,
        description: "Gas Station",
        amount: 42.3,
        category: "Transportation",
        date: "2025-01-14",
        type: "expense" as const,
      },
      {
        id: 3,
        description: "Netflix",
        amount: 15.99,
        category: "Entertainment",
        date: "2025-01-13",
        type: "expense" as const,
      },
      {
        id: 4,
        description: "Salary Deposit",
        amount: 3200.0,
        category: "Income",
        date: "2025-01-01",
        type: "income" as const,
      },
    ],
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Welcome back, {user?.name}!
        </h1>
        <InteractiveDashboard user={user} financialData={financialData} />
      </div>
    </div>
  );
}
