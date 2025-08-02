import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import LayoutWrapper from "@/components/LayoutWrapper";
import { SidebarProvider } from "@/contexts/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Optifi - Smart Financial Tracking",
  description:
    "Financial Tracking Through OCR and AI-Driven Budget Forecasting",
  keywords: "finance, budgeting, OCR, AI, expense tracking, financial planning",
  authors: [{ name: "Optifi Team" }],
  manifest: "/manifest.json",
};

export const viewport = {
  // Add your viewport settings here, e.g. width: 'device-width', initialScale: 1
};

export const themeColor = {
  // Add your themeColor settings here, e.g. color: '#ffffff'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <SidebarProvider>
          <Navigation />
          <LayoutWrapper>{children}</LayoutWrapper>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
