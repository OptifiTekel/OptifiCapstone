"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Mail,
  Briefcase,
  Target,
  DollarSign,
  Bell,
  Shield,
  Calendar,
  Save,
  Edit,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function InteractiveProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    monthlyBudget: "",
    occupation: "",
    financialGoal: "",
    joinedDate: "",
    totalTransactions: 0,
    averageMonthlySpend: 0,
  });

  const [editData, setEditData] = useState({ ...userData });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    budgetAlerts: true,
    weeklyReports: true,
    receiptReminders: false,
  });

  const occupations = [
    "Software Developer",
    "Teacher",
    "Healthcare Worker",
    "Business Analyst",
    "Marketing Professional",
    "Sales Representative",
    "Engineer",
    "Designer",
    "Student",
    "Freelancer",
    "Entrepreneur",
    "Other",
  ];

  const financialGoals = [
    { value: "savings", label: "Building Savings" },
    { value: "debt_reduction", label: "Debt Reduction" },
    { value: "spending_control", label: "Better Spending Control" },
    { value: "investment", label: "Investment Planning" },
    { value: "emergency_fund", label: "Emergency Fund" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserData({
          name: user.user_metadata?.name || "",
          email: user.email || "",
          monthlyBudget: user.user_metadata?.monthlyBudget || "",
          occupation: user.user_metadata?.occupation || "",
          financialGoal: user.user_metadata?.financialGoal || "",
          joinedDate: user.created_at ? user.created_at.split("T")[0] : "",
          totalTransactions: 0, // You can fetch this from your DB if available
          averageMonthlySpend: 0, // You can fetch this from your DB if available
        });
        setEditData({
          name: user.user_metadata?.name || "",
          email: user.email || "",
          monthlyBudget: user.user_metadata?.monthlyBudget || "",
          occupation: user.user_metadata?.occupation || "",
          financialGoal: user.user_metadata?.financialGoal || "",
          joinedDate: user.created_at ? user.created_at.split("T")[0] : "",
          totalTransactions: 0,
          averageMonthlySpend: 0,
        });
      }
    }
    fetchUser();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePreferenceChange = (preference: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUserData(editData);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Profile Settings
            </h1>
            <p className="text-slate-600">
              Manage your account information and preferences
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="accent-primary hover:accent-primary text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="accent-primary hover:accent-primary text-white"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertDescription className="text-green-600">
            Profile updated successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Account Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <Calendar className="mx-auto h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Member Since</p>
            <p className="font-semibold">{formatDate(userData.joinedDate)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Target className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Total Transactions</p>
            <p className="font-semibold">{userData.totalTransactions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <DollarSign className="mx-auto h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Avg Monthly Spend</p>
            <p className="font-semibold">
              {formatCurrency(userData.averageMonthlySpend)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your basic account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  value={isEditing ? editData.name : userData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? editData.email : userData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              {isEditing ? (
                <Select
                  value={editData.occupation}
                  onValueChange={(value) =>
                    handleInputChange("occupation", value)
                  }
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Briefcase className="mr-3 h-4 w-4 text-slate-400" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {occupations.map((occupation) => (
                      <SelectItem key={occupation} value={occupation}>
                        {occupation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={userData.occupation}
                    disabled
                    className="pl-10"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Financial Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Financial Settings
            </CardTitle>
            <CardDescription>
              Configure your budget and financial goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyBudget">Monthly Budget</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="monthlyBudget"
                  type="number"
                  step="0.01"
                  value={
                    isEditing ? editData.monthlyBudget : userData.monthlyBudget
                  }
                  onChange={(e) =>
                    handleInputChange("monthlyBudget", e.target.value)
                  }
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="financialGoal">Primary Financial Goal</Label>
              {isEditing ? (
                <Select
                  value={editData.financialGoal}
                  onValueChange={(value) =>
                    handleInputChange("financialGoal", value)
                  }
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Target className="mr-3 h-4 w-4 text-slate-400" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {financialGoals.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={
                      financialGoals.find(
                        (g) => g.value === userData.financialGoal
                      )?.label || userData.financialGoal
                    }
                    disabled
                    className="pl-10"
                  />
                </div>
              )}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-1">
                Current Progress
              </p>
              <p className="text-sm text-blue-600">
                You're on track to meet your{" "}
                {financialGoals
                  .find((g) => g.value === userData.financialGoal)
                  ?.label.toLowerCase()}{" "}
                goal this month.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Preferences */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose what notifications you'd like to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-slate-600">
                  Receive general updates and important information
                </p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("emailNotifications", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Budget Alerts</Label>
                <p className="text-sm text-slate-600">
                  Get notified when you're approaching your budget limit
                </p>
              </div>
              <Switch
                checked={preferences.budgetAlerts}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("budgetAlerts", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-slate-600">
                  Receive a summary of your weekly spending activity
                </p>
              </div>
              <Switch
                checked={preferences.weeklyReports}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("weeklyReports", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Receipt Reminders</Label>
                <p className="text-sm text-slate-600">
                  Remind me to scan receipts regularly
                </p>
              </div>
              <Switch
                checked={preferences.receiptReminders}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("receiptReminders", checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Account Security
          </CardTitle>
          <CardDescription>
            Manage your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-slate-600">
                  Last changed 2 months ago
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-slate-600">
                  Add an extra layer of security
                </p>
              </div>
              <Badge variant="secondary">Not Enabled</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Login Activity</p>
                <p className="text-sm text-slate-600">
                  View recent login attempts
                </p>
              </div>
              <Button variant="outline">View Activity</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="mt-8 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800">Danger Zone</CardTitle>
          <CardDescription>
            These actions are permanent and cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">Export Data</p>
                <p className="text-sm text-red-600">
                  Download all your financial data
                </p>
              </div>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Export Data
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">Delete Account</p>
                <p className="text-sm text-red-600">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
