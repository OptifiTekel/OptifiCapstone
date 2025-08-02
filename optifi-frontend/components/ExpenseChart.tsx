"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Category {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface ExpenseChartProps {
  categories: Category[];
  detailed?: boolean;
}

export default function ExpenseChart({
  categories,
  detailed = false,
}: ExpenseChartProps) {
  const [period, setPeriod] = useState("month");
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const COLORS = [
    "#3B82F6", // blue
    "#10B981", // green
    "#8B5CF6", // purple
    "#F59E0B", // orange
    "#EC4899", // pink
    "#06B6D4", // cyan
    "#84CC16", // lime
    "#F97316", // orange-500
  ];

  const pieData = categories.map((category, index) => ({
    name: category.name,
    value: category.amount,
    percentage: category.percentage,
    color: COLORS[index % COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-slate-600">
            Amount: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-slate-600">
            Percentage: {payload[0].payload.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (detailed) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>Detailed Spending Analysis</CardTitle>
              <CardDescription>
                Breakdown of your expenses across different categories
              </CardDescription>
            </div>
            <div className="w-36 self-end">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Days</SelectItem>
                  <SelectItem value="week">Weeks</SelectItem>
                  <SelectItem value="month">Months</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div>
                <h3 className="text-lg font-medium mb-4">Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ percentage }) => `${percentage}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div>
                <h3 className="text-lg font-medium mb-4">Amount Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Details */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-slate-600">
                        {category.percentage}% of total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(category.amount)}
                    </p>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingDown className="mr-1 h-3 w-3" />
                      -2.3% vs last month
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Overview (non-detailed) Spending by Category
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>
            Your expense distribution for this {period}
          </CardDescription>
        </div>
        <div className="w-36 self-end">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Days</SelectItem>
              <SelectItem value="week">Weeks</SelectItem>
              <SelectItem value="month">Months</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend and Details */}
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatCurrency(category.amount)}
                  </span>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-slate-600">
                  <span>{category.percentage}% of total</span>
                  <Badge variant="secondary" className="text-xs">
                    Budget: 25%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
