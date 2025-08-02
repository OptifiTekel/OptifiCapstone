"use client";

import Link from "next/link";
import InteractiveNavigation from "@/components/client/InteractiveNavigation";
import Sidebar from "@/components/Sidebar";
import MobileSidebarToggle from "@/components/MobileSidebarToggle";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [authChecked, setAuthChecked] = useState(false);
  const { isOpen, setIsOpen } = useSidebar();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(!!data.user);
      setAuthChecked(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session?.user);
        setAuthChecked(true);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const publicLinks = isAuthenticated
    ? [
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ];

  const userLinks = isAuthenticated
    ? [
        { href: "/home", label: "Home" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/scan", label: "Scan Receipts" },
        { href: "/calendar", label: "Calendar" },
        { href: "/profile", label: "Profile" },
        { href: "/settings", label: "Settings" },
      ]
    : [];

  const adminLinks = [{ href: "/admin", label: "Admin Panel" }];

  if (!authChecked) {
    // Optionally, render a skeleton or nothing for fast tab switching
    return null;
  }

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Toggle Button, Logo, and Title */}
            <div className="flex items-center space-x-4">
              {/* Mobile Toggle Button */}
              {isAuthenticated && (
                <MobileSidebarToggle isOpen={isOpen} onToggle={setIsOpen} />
              )}

              <Link href="/" className="flex items-center space-x-2">
                <img
                  src="/icons/icon-192x192.png"
                  alt="Optifi Logo"
                  className="h-8 w-8"
                />
                <div className="text-2xl font-bold accent-text">Optifi</div>
              </Link>
            </div>

            <InteractiveNavigation
              isAuthenticated={isAuthenticated}
              userRole={userRole}
              publicLinks={publicLinks}
              userLinks={userLinks}
              adminLinks={adminLinks}
            />
          </div>
        </div>
      </nav>

      {/* Sidebar for authenticated users */}
      <Sidebar
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        userLinks={userLinks}
        adminLinks={adminLinks}
        isOpen={isOpen}
        onToggle={setIsOpen}
      />
    </>
  );
}
