"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Target,
  Check,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// Multi-step form types
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
  "savings",
  "debt_reduction",
  "spending_control",
  "investment",
  "emergency_fund",
];

type FormStep = "account" | "onboarding";

export default function InteractiveRegisterForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [onboardingData, setOnboardingData] = useState({
    monthlyBudget: "",
    occupation: "",
    financialGoal: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Password requirements
  const passwordRequirements = [
    {
      label: "At least 8 characters long",
      test: (pw: string) => pw.length >= 8,
    },
    { label: "Maximum 16 characters", test: (pw: string) => pw.length <= 16 },
    {
      label: "Contains lowercase letter",
      test: (pw: string) => /[a-z]/.test(pw),
    },
    {
      label: "Contains uppercase letter",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "Contains special character",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
    { label: "Contains number", test: (pw: string) => /[0-9]/.test(pw) },
  ];

  const handleAccountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOnboardingInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setOnboardingData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setOnboardingData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateAccountStep = () => {
    const newErrors: Record<string, string> = {};
    if (!accountData.name.trim()) newErrors.name = "Full name is required";
    if (!accountData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(accountData.email))
      newErrors.email = "Please enter a valid email address";
    if (!accountData.password) newErrors.password = "Password is required";
    else {
      const pw = accountData.password;
      if (pw.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      else if (pw.length > 16)
        newErrors.password = "Password must be at most 16 characters";
      else if (!/[a-z]/.test(pw))
        newErrors.password = "Password must contain a lowercase letter";
      else if (!/[A-Z]/.test(pw))
        newErrors.password = "Password must contain an uppercase letter";
      else if (!/[^A-Za-z0-9]/.test(pw))
        newErrors.password = "Password must contain a special character";
      else if (!/[0-9]/.test(pw))
        newErrors.password = "Password must contain a number";
    }
    if (!accountData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (accountData.password !== accountData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOnboardingStep = () => {
    const newErrors: Record<string, string> = {};
    if (!onboardingData.monthlyBudget)
      newErrors.monthlyBudget = "Monthly budget is required";
    else if (
      isNaN(Number(onboardingData.monthlyBudget)) ||
      Number(onboardingData.monthlyBudget) <= 0
    )
      newErrors.monthlyBudget = "Please enter a valid budget amount";
    if (!onboardingData.occupation)
      newErrors.occupation = "Please select your occupation";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAccountStep()) setCurrentStep("onboarding");
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOnboardingStep()) return;
    setIsLoading(true);
    setErrors({});
    try {
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: accountData.email,
        password: accountData.password,
        options: {
          data: {
            name: accountData.name,
            monthlyBudget: onboardingData.monthlyBudget,
            occupation: onboardingData.occupation,
            financialGoal: onboardingData.financialGoal,
          },
        },
      });
      if (error) {
        setErrors({ submit: error.message });
        setIsLoading(false);
        return;
      }
      // Insert into profiles table
      const user = data?.user;
      if (user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            name: accountData.name,
            email: accountData.email,
            monthly_budget: onboardingData.monthlyBudget,
            occupation: onboardingData.occupation,
            financial_goal: onboardingData.financialGoal,
          },
        ]);
        if (profileError) {
          // Optionally handle error (show message, etc.)
          console.error(profileError);
        }
      }
      window.location.href = "/login";
    } catch (error: any) {
      setErrors({
        submit: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProgress = () => (currentStep === "account" ? 50 : 100);

  return (
    <>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">
            {currentStep === "account"
              ? "Account Setup"
              : "Personal Information"}
          </span>
          <span className="text-sm text-slate-500">
            {currentStep === "account" ? "1" : "2"} of 2
          </span>
        </div>
        <Progress value={getProgress()} className="h-2" />
      </div>

      {/* Back Button for Onboarding Step */}
      {currentStep === "onboarding" && (
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setCurrentStep("account")}
            className="inline-flex items-center text-slate-500 hover:text-slate-700 transition-colors text-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>
      )}
      {currentStep === "account" ? (
        <form onSubmit={handleAccountSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-slate-700"
            >
              Full Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={accountData.name}
                onChange={handleAccountInputChange}
                className={`pl-10 h-12 ${errors.name ? "border-red-500" : ""}`}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email Address <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={accountData.email}
                onChange={handleAccountInputChange}
                className={`pl-10 h-12 ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={accountData.password}
                onChange={handleAccountInputChange}
                className={`pl-10 pr-10 h-12 ${
                  errors.password ? "border-red-500" : ""
                }`}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-400" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400" />
                )}
              </Button>
            </div>
            {/* Password requirements checklist */}
            {accountData.password.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-xs font-medium text-slate-700 mb-1">
                  Password requirements:
                </p>
                <ul className="text-xs space-y-1">
                  {passwordRequirements.map((req, idx) => {
                    const met = req.test(accountData.password);
                    return (
                      <li key={idx} className="flex items-center gap-2">
                        {met ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={met ? "text-green-700" : "text-red-600"}
                        >
                          {req.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-slate-700"
            >
              Confirm Password <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={accountData.confirmPassword}
                onChange={handleAccountInputChange}
                className={`pl-10 pr-10 h-12 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-400" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          {/* Continue Button */}
          <Button
            type="submit"
            className="w-full h-12 accent-primary hover:accent-primary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOnboardingSubmit} className="space-y-6">
          {/* Monthly Budget */}
          <div className="space-y-2">
            <Label
              htmlFor="monthlyBudget"
              className="text-sm font-medium text-slate-700"
            >
              Monthly Budget <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-lg">
                ₱
              </span>
              <Input
                id="monthlyBudget"
                name="monthlyBudget"
                type="number"
                placeholder="25000"
                value={onboardingData.monthlyBudget}
                onChange={handleOnboardingInputChange}
                className={`pl-10 h-12 ${
                  errors.monthlyBudget ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.monthlyBudget && (
              <p className="text-sm text-red-600">{errors.monthlyBudget}</p>
            )}
            <p className="text-sm text-slate-500">
              This helps us provide personalized budget recommendations
            </p>
          </div>
          {/* Occupation */}
          <div className="space-y-2">
            <Label
              htmlFor="occupation"
              className="text-sm font-medium text-slate-700"
            >
              Occupation <span className="text-red-500 ml-1">*</span>
            </Label>
            <select
              id="occupation"
              name="occupation"
              value={onboardingData.occupation}
              onChange={(e) => handleSelectChange("occupation", e.target.value)}
              className={`h-12 w-full border rounded px-3 ${
                errors.occupation ? "border-red-500" : ""
              }`}
            >
              <option value="">Select your occupation</option>
              {occupations.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
            {errors.occupation && (
              <p className="text-sm text-red-600">{errors.occupation}</p>
            )}
          </div>
          {/* Financial Goal */}
          <div className="space-y-2">
            <Label
              htmlFor="financialGoal"
              className="text-sm font-medium text-slate-700"
            >
              Primary Financial Goal{" "}
              <Badge variant="secondary" className="ml-2">
                Optional
              </Badge>
            </Label>
            <select
              id="financialGoal"
              name="financialGoal"
              value={onboardingData.financialGoal}
              onChange={(e) =>
                handleSelectChange("financialGoal", e.target.value)
              }
              className="h-12 w-full border rounded px-3"
            >
              <option value="">Choose your main financial goal</option>
              <option value="savings">Building Savings</option>
              <option value="debt_reduction">Debt Reduction</option>
              <option value="spending_control">Better Spending Control</option>
              <option value="investment">Investment Planning</option>
              <option value="emergency_fund">Emergency Fund</option>
            </select>
            <p className="text-sm text-slate-500">
              This helps us tailor insights to your financial priorities
            </p>
          </div>
          {/* Submit Error */}
          {errors.submit && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-600">
                {errors.submit}
              </AlertDescription>
            </Alert>
          )}
          {/* Form Actions */}
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-12 accent-primary hover:accent-primary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
