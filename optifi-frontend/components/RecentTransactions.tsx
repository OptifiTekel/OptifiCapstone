"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  ArrowUpDown,
  Eye,
  TrendingDown,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "expense" | "income";
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  showAll?: boolean;
}

export default function RecentTransactions({
  transactions,
  showAll = false,
}: RecentTransactionsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [filterType, setFilterType] = useState<"all" | "expense" | "income">(
    "all"
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Food & Dining": "bg-blue-100 text-blue-800",
      Transportation: "bg-green-100 text-green-800",
      Shopping: "bg-purple-100 text-purple-800",
      "Bills & Utilities": "bg-orange-100 text-orange-800",
      Entertainment: "bg-pink-100 text-pink-800",
      Healthcare: "bg-red-100 text-red-800",
      Income: "bg-emerald-100 text-emerald-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors["Other"];
  };

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === "all" || transaction.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

  const displayedTransactions = showAll
    ? filteredTransactions
    : filteredTransactions.slice(0, 5);

  // Calculate summary stats
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center">
              {showAll ? (
                <>
                  <DollarSign className="mr-2 h-5 w-5" />
                  All Transactions
                </>
              ) : (
                "Recent Transactions"
              )}
            </CardTitle>
            <CardDescription>
              {showAll
                ? `${filteredTransactions.length} transactions found`
                : "Your latest financial activity"}
            </CardDescription>
          </div>

          {showAll && (
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {showAll && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-slate-600 mb-1">Total Expenses</p>
                <p className="text-xl font-bold text-red-600 flex items-center justify-center">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600 mb-1">Total Income</p>
                <p className="text-xl font-bold text-green-600 flex items-center justify-center">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  {formatCurrency(totalIncome)}
                </p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterType === "expense" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("expense")}
                >
                  Expenses
                </Button>
                <Button
                  variant={filterType === "income" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("income")}
                >
                  Income
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortBy(sortBy === "date" ? "amount" : "date")}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort by {sortBy === "date" ? "Amount" : "Date"}
              </Button>
            </div>
          </>
        )}

        {/* Transactions List */}
        <div className="space-y-3">
          {displayedTransactions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <DollarSign className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p>No transactions found</p>
              {searchTerm && (
                <Button
                  variant="link"
                  onClick={() => setSearchTerm("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            displayedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === "expense"
                        ? "bg-red-100"
                        : "bg-green-100"
                    }`}
                  >
                    {transaction.type === "expense" ? (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getCategoryColor(
                          transaction.category
                        )}`}
                      >
                        {transaction.category}
                      </Badge>
                      <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.type === "expense" ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  {showAll && (
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Eye className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Show More Button for non-detailed view */}
        {!showAll && transactions.length > 5 && (
          <div className="text-center mt-6">
            <Button variant="outline">
              View All Transactions
              <Eye className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Load More for detailed view */}
        {showAll &&
          filteredTransactions.length > displayedTransactions.length && (
            <div className="text-center mt-6">
              <Button variant="outline">Load More Transactions</Button>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
