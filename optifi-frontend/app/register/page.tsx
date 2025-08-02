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
import InteractiveRegisterForm from "@/components/client/InteractiveRegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              {/* Title Section */}
              <div className="text-center">
                <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
                  Create Account
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <InteractiveRegisterForm />

              {/* Sign In Link */}
              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="accent-text hover:underline font-medium"
                  >
                    Sign in here
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
