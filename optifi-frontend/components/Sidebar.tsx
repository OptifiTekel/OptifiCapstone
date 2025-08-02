"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Camera,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabaseClient";

interface SidebarProps {
  isAuthenticated: boolean;
  userRole: string;
  userLinks: Array<{ href: string; label: string }>;
  adminLinks: Array<{ href: string; label: string }>;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function Sidebar({
  isAuthenticated,
  userRole,
  userLinks,
  adminLinks,
  isOpen: externalIsOpen,
  onToggle: externalOnToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnToggle || setInternalIsOpen;

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const getIconForLink = (href: string) => {
    switch (href) {
      case "/home":
        return <Home className="h-5 w-5" />;
      case "/dashboard":
        return <BarChart3 className="h-5 w-5" />;
      case "/scan":
        return <Camera className="h-5 w-5" />;
      case "/calendar":
        return <Calendar className="h-5 w-5" />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay - Click outside to close */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-full bg-white border-r border-slate-200 shadow-sm z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 w-80`}
      >
        <div className="p-4">
          {/* Navigation Links */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Navigation
            </div>

            {userLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActiveLink(link.href)
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {getIconForLink(link.href)}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {/* Admin Links */}
            {userRole === "admin" && (
              <>
                <div className="border-t border-slate-200 my-4"></div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Admin
                </div>
                {adminLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActiveLink(link.href)
                        ? "bg-red-50 text-red-700 border-r-2 border-red-700"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* User Account Section */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="border-t border-slate-200 pt-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        Account
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">
                      User Account
                    </p>
                    <p className="text-xs text-slate-500">
                      Manage your account
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/";
                    }}
                    className="text-red-600 focus:text-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
