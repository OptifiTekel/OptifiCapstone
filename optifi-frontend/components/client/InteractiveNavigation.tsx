"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, LogOut, ChevronDown, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabaseClient";

interface InteractiveNavigationProps {
  isAuthenticated: boolean;
  userRole: string;
  publicLinks: Array<{ href: string; label: string }>;
  userLinks: Array<{ href: string; label: string }>;
  adminLinks: Array<{ href: string; label: string }>;
}

export default function InteractiveNavigation({
  isAuthenticated,
  userRole,
  publicLinks,
  userLinks,
  adminLinks,
}: InteractiveNavigationProps) {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      {/* Mobile/Tablet Layout */}
      <div className="md:hidden flex items-center">
        {/* Right: Sign In Button (for non-authenticated users only) */}
        {!isAuthenticated && (
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-700 hover:text-slate-900 text-base font-bold"
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Desktop Layout (Sign In Button Only) */}
      <div className="hidden md:flex items-center">
        {/* Right: Sign In Button (for non-authenticated users only) */}
        {!isAuthenticated && (
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-slate-700 hover:text-slate-900 text-base font"
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
