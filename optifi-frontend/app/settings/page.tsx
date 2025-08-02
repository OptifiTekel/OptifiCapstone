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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Download,
  Smartphone,
  Globe,
  Database,
  Zap,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    weeklyReports: true,
    monthlyInsights: true,
    receiptReminders: false,
    pushNotifications: true,
    emailDigest: true,
    smsAlerts: false,
  });

  const [appSettings, setAppSettings] = useState({
    autoScan: true,
    smartCategories: true,
    dataSync: true,
    analytics: true,
    location: false,
    biometrics: false,
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAppSettingChange = (key: string, value: boolean) => {
    setAppSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const ThemeOption = ({
    value,
    icon: Icon,
    label,
  }: {
    value: "light" | "dark" | "system";
    icon: any;
    label: string;
  }) => (
    <button
      onClick={() => setTheme(value)}
      className={`p-4 rounded-lg border-2 transition-all ${
        theme === value
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <Icon
        className={`h-6 w-6 mx-auto mb-2 ${
          theme === value ? "text-blue-600" : "text-slate-600"
        }`}
      />
      <p
        className={`text-sm font-medium ${
          theme === value ? "text-blue-800" : "text-slate-700"
        }`}
      >
        {label}
      </p>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center">
            <SettingsIcon className="mr-3 h-8 w-8" />
            Settings
          </h1>
          <p className="text-slate-600">
            Customize your Optifi experience and preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">
                    Budget & Spending Alerts
                  </h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Budget Alerts</Label>
                      <p className="text-sm text-slate-600">
                        Get notified when you're approaching your budget limit
                      </p>
                    </div>
                    <Switch
                      checked={notifications.budgetAlerts}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("budgetAlerts", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-slate-600">
                        Receive a summary of your weekly spending activity
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("weeklyReports", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Monthly Insights</Label>
                      <p className="text-sm text-slate-600">
                        Get AI-powered insights and recommendations monthly
                      </p>
                    </div>
                    <Switch
                      checked={notifications.monthlyInsights}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("monthlyInsights", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Receipt Reminders</Label>
                      <p className="text-sm text-slate-600">
                        Remind me to scan receipts regularly
                      </p>
                    </div>
                    <Switch
                      checked={notifications.receiptReminders}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("receiptReminders", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                App Features
              </CardTitle>
              <CardDescription>
                Configure smart features and automation settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Receipt Scanning</Label>
                    <p className="text-sm text-slate-600">
                      Automatically process receipts when uploaded
                    </p>
                  </div>
                  <Switch
                    checked={appSettings.autoScan}
                    onCheckedChange={(checked) =>
                      handleAppSettingChange("autoScan", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Advanced Analytics</Label>
                    <p className="text-sm text-slate-600">
                      Enable detailed spending analysis and insights
                    </p>
                  </div>
                  <Switch
                    checked={appSettings.analytics}
                    onCheckedChange={(checked) =>
                      handleAppSettingChange("analytics", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About Optifi</CardTitle>
              <CardDescription>App information and support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full">
                    Help & Support
                  </Button>
                  <Button variant="outline" className="w-full">
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full">
                    Terms of Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
