"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (error) {
      setErrors({ submit: "Failed to send reset email. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className={`pl-10 h-12 ${errors.email ? "border-red-500" : ""}`}
          />
        </div>
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-600">
            {errors.submit}
          </AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-700">
            If an account with that email exists, a password reset link has been
            sent.
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 accent-primary hover:accent-primary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending...
          </div>
        ) : (
          "Send Reset Link"
        )}
      </Button>
    </form>
  );
}
