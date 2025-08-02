"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Scan,
  Smartphone,
  Mail,
  Bug,
  Star,
  Shield,
  FileText,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Scan className="h-8 w-8 text-blue-600" />,
      title: "Advanced OCR Technology",
      description:
        "An optical character recognition technology that extracts data from receipts.",
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: "AI-Powered Insights",
      description:
        "Machine learning algorithms analyze your spending patterns to provide personalized budget forecasts and recommendations.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      title: "User-Friendly Interface & Modern Design",
      description:
        "Enjoy a clean, intuitive, and modern interface designed for ease of use on any device.",
    },
  ];

  const teamMembers = [
    {
      name: "Gabriel N. Loteriña",
      role: "Lead Developer, Head of the Team, Documentation Member, Backend, Machine Learning",
    },
    {
      name: "Jeanson Villanueva",
      role: "Documentation Head, System Designer, System Programmer, Frontend, Machine Learning",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Optifi
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Smart financial tracking through OCR and AI-driven insights.
            Visualize your spending, scan receipts, and forecast your budget
            with ease.
          </p>
          <div className="flex justify-center mb-8">
            <Link href="/register">
              <Button
                size="lg"
                className="text-lg px-8 py-6 w-auto min-w-[200px] sm:min-w-[220px]"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Header */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              About Optifi
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We&apos;re on a mission to transform personal finance management
              through intelligent OCR technology and AI-driven insights, making
              financial literacy accessible to everyone.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Choose Optifi?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We combine the latest in AI and OCR technology to deliver a
              financial tracking experience that&apos;s both powerful and
              intuitive.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <CardTitle className="ml-3">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600">
              The talented people behind Optifi&apos;s innovation
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-blue-600 text-center">
                    {member.role}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/icons/icon-192x192.png"
                  alt="Optifi Logo"
                  className="h-8 w-8"
                />
                <div className="text-xl font-bold">Optifi</div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Smart financial tracking through OCR and AI-driven insights.
                Making financial literacy accessible to everyone.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Support & Help */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support & Help</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact Support</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <Bug className="h-4 w-4" />
                    <span>Report Bugs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <Star className="h-4 w-4" />
                    <span>Submit Review</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Data Protection
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-slate-700 mt-8 pt-8">
            <div className="text-center">
              <div className="bg-slate-800 rounded-lg p-4 mb-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                  <strong className="text-white">⚠️ DISCLAIMER:</strong> This
                  project is developed as a{" "}
                  <strong className="text-white">Capstone Project</strong> for
                  educational purposes only. It is not intended for commercial
                  use or production deployment. This is a demonstration of
                  skills and knowledge acquired during academic studies.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-400 text-sm">
                © 2025 Optifi. All rights reserved. Developed as a Capstone
                Project only
              </div>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Status
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Accessibility
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Roadmap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
