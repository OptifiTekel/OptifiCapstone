"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Lightbulb,
  Calendar,
  DollarSign,
  PiggyBank,
} from "lucide-react";

interface User {
  name: string;
  monthlyBudget: number;
  occupation: string;
  financialGoal: string;
}

interface FinancialData {
  totalSpent: number;
  remainingBudget: number;
  budgetProgress: number;
  monthlyChange: number;
  categories: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
}

interface BudgetInsightsProps {
  user: User;
  financialData: FinancialData;
}

export default function BudgetInsights({
  user,
  financialData,
}: BudgetInsightsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getGoalText = (goal: string) => {
    const goals: Record<string, string> = {
      savings: "Building Savings",
      debt_reduction: "Debt Reduction",
      spending_control: "Better Spending Control",
      investment: "Investment Planning",
      emergency_fund: "Emergency Fund",
    };
    return goals[goal] || goal;
  };

  // AI-driven insights based on user data
  const insights = [
    {
      type: "warning",
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      title: "Budget Alert",
      message: `You've spent ${
        financialData.budgetProgress
      }% of your monthly budget. At this pace, you'll exceed your budget by ${formatCurrency(
        financialData.totalSpent / 0.5 - user.monthlyBudget
      )}.`,
      action: "Review spending categories",
    },
    {
      type: "tip",
      icon: <Lightbulb className="h-5 w-5 text-blue-600" />,
      title: "Smart Tip for " + user.occupation,
      message:
        "Based on other software developers, you could save $150/month by meal prepping instead of dining out for lunch.",
      action: "See meal prep ideas",
    },
    {
      type: "goal",
      icon: <Target className="h-5 w-5 text-green-600" />,
      title: getGoalText(user.financialGoal) + " Progress",
      message: `You're on track to save ${formatCurrency(
        financialData.remainingBudget
      )} this month. Consider automating transfers to reach your ${getGoalText(
        user.financialGoal
      ).toLowerCase()} goal faster.`,
      action: "Set up auto-save",
    },
  ];

  // Forecast data (mock predictions)
  const forecast = {
    nextMonthPrediction: 1950.45,
    savingsPotential: 320.0,
    topSpendingCategory: financialData.categories[0]?.name || "Food & Dining",
    recommendedBudgetAdjustment: -150,
  };

  const comparisonData = [
    {
      category: "Compared to similar profiles",
      metric: "Food & Dining",
      yourAmount: 567.45,
      averageAmount: 450.0,
      status: "above",
    },
    {
      category: "Industry average",
      metric: "Transportation",
      yourAmount: 289.2,
      averageAmount: 320.0,
      status: "below",
    },
    {
      category: "Your location",
      metric: "Entertainment",
      yourAmount: 199.22,
      averageAmount: 250.0,
      status: "below",
    },
  ];

  return (
    <div className="space-y-6">
      {/* User Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Your Financial Profile
          </CardTitle>
          <CardDescription>
            Personalized insights based on your profile and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <DollarSign className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <p className="text-sm text-slate-600 mb-1">Monthly Budget</p>
              <p className="text-xl font-bold">
                {formatCurrency(user.monthlyBudget)}
              </p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <Calendar className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <p className="text-sm text-slate-600 mb-1">Occupation</p>
              <p className="text-xl font-bold">{user.occupation}</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <PiggyBank className="mx-auto h-8 w-8 text-purple-600 mb-2" />
              <p className="text-sm text-slate-600 mb-1">Financial Goal</p>
              <p className="text-xl font-bold">
                {getGoalText(user.financialGoal)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>
            Personalized recommendations based on your spending patterns and
            goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.type === "warning"
                    ? "border-orange-500 bg-orange-50"
                    : insight.type === "tip"
                    ? "border-blue-500 bg-blue-50"
                    : "border-green-500 bg-green-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {insight.icon}
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {insight.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Budget Forecast
          </CardTitle>
          <CardDescription>
            AI predictions based on your spending patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">
                Next Month Prediction
              </p>
              <p className="text-xl font-bold text-slate-800">
                {formatCurrency(forecast.nextMonthPrediction)}
              </p>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingDown className="mr-1 h-3 w-3" />
                {formatCurrency(
                  financialData.totalSpent - forecast.nextMonthPrediction
                )}{" "}
                less
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">Savings Potential</p>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(forecast.savingsPotential)}
              </p>
              <p className="text-xs text-slate-500 mt-1">With optimizations</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">Top Spending</p>
              <p className="text-xl font-bold text-slate-800">
                {forecast.topSpendingCategory}
              </p>
              <Badge variant="secondary" className="mt-1">
                Optimize here
              </Badge>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">Budget Adjustment</p>
              <p className="text-xl font-bold text-blue-600">
                {formatCurrency(Math.abs(forecast.recommendedBudgetAdjustment))}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Recommended reduction
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Comparison</CardTitle>
          <CardDescription>
            See how your spending compares to similar profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {comparisonData.map((comparison, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">
                      {comparison.metric}
                    </p>
                    <p className="text-sm text-slate-600">
                      {comparison.category}
                    </p>
                  </div>
                  <Badge
                    variant={
                      comparison.status === "above"
                        ? "destructive"
                        : "secondary"
                    }
                    className="flex items-center"
                  >
                    {comparison.status === "above" ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {comparison.status === "above" ? "Above" : "Below"} Average
                  </Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>You: {formatCurrency(comparison.yourAmount)}</span>
                      <span>
                        Average: {formatCurrency(comparison.averageAmount)}
                      </span>
                    </div>
                    <Progress
                      value={
                        (comparison.yourAmount / comparison.averageAmount) * 100
                      }
                      className="h-2"
                    />
                  </div>
                </div>

                <div className="text-sm text-slate-600">
                  {comparison.status === "above"
                    ? `You spend ${formatCurrency(
                        comparison.yourAmount - comparison.averageAmount
                      )} more than average`
                    : `You spend ${formatCurrency(
                        comparison.averageAmount - comparison.yourAmount
                      )} less than average`}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>
            Take these steps to improve your financial health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <h4 className="font-semibold text-blue-800">
                  Set up automatic savings
                </h4>
                <p className="text-sm text-blue-600">
                  Save {formatCurrency(200)} automatically each month toward
                  your {getGoalText(user.financialGoal).toLowerCase()} goal
                </p>
              </div>
              <Button className="accent-primary hover:accent-primary text-white">
                Set Up
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <h4 className="font-semibold text-orange-800">
                  Reduce dining expenses
                </h4>
                <p className="text-sm text-orange-600">
                  You could save {formatCurrency(150)}/month by cooking at home
                  3 more times per week
                </p>
              </div>
              <Button variant="outline">Get Tips</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <h4 className="font-semibold text-green-800">
                  Track receipt scanning
                </h4>
                <p className="text-sm text-green-600">
                  Scan receipts regularly to maintain accurate expense tracking
                </p>
              </div>
              <Button variant="outline">Scan Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
