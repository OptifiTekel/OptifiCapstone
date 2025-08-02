"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSidebar } from "@/contexts/SidebarContext";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const { isOpen } = useSidebar();

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

  if (!authChecked) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isAuthenticated
          ? isOpen
            ? "ml-80 md:ml-64" // Mobile: 320px, Desktop: 256px
            : "md:ml-64" // Desktop only
          : ""
      }`}
    >
      {children}
    </div>
  );
}
