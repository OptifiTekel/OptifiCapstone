'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function InteractiveHomePage() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
      <Link href="/register">
        <Button className="accent-primary hover:accent-primary text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          Get Started Free
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
      <Link href="/about">
        <Button variant="outline" className="px-8 py-6 text-lg rounded-lg border-2 hover:bg-slate-50 transition-all duration-300">
          Learn More
        </Button>
      </Link>
    </div>
  );
}