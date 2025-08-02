"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function UserHome() {
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
      } else {
        setUser(data.session.user);
        setAuthChecked(true);
      }
    });
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome{user ? `, ${user.email}` : "!"}
        </h1>
        <p className="text-lg text-slate-600 mb-6">
          This is your personal Optifi Home. Get a quick overview and jump right
          into managing your finances!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
        <Card className="p-6 flex flex-col items-center text-center shadow-md">
          <CardTitle className="mb-2">Go to Dashboard</CardTitle>
          <CardDescription className="mb-4">
            View your financial summary, charts, and recent activity.
          </CardDescription>
          <Link href="/dashboard">
            <Button>Open Dashboard</Button>
          </Link>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center shadow-md">
          <CardTitle className="mb-2">Scan a Receipt</CardTitle>
          <CardDescription className="mb-4">
            Quickly add expenses by scanning your receipts with OCR.
          </CardDescription>
          <Link href="/scan">
            <Button>Scan Now</Button>
          </Link>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center shadow-md">
          <CardTitle className="mb-2">Profile & Settings</CardTitle>
          <CardDescription className="mb-4">
            Update your profile, preferences, and security settings.
          </CardDescription>
          <Link href="/settings">
            <Button>Go to Settings</Button>
          </Link>
        </Card>
      </div>
      <div className="text-slate-500 text-sm">
        Tip: Use the navigation bar to access all features at any time.
      </div>
    </div>
  );
}
