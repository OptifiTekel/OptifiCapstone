"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import InteractiveLoginForm from "@/components/client/InteractiveLoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              {/* Back Button */}
              <div className="mb-4">
                <Link
                  href="/"
                  className="inline-flex items-center text-slate-500 hover:text-slate-700 transition-colors text-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </div>

              {/* Title Section */}
              <div className="text-center">
                <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Sign in to your Optifi account
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <InteractiveLoginForm />

              {/* Forgot Password */}
              <div className="flex justify-end mt-6">
                <Link
                  href="/forgot-password"
                  className="text-sm accent-text hover:underline font-medium"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="accent-text hover:underline font-medium"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
