import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  HelpCircle
} from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Display */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold accent-text mb-4">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Oops! The page you're looking for seems to have wandered off. 
            Don't worry, even the best financial plans have unexpected detours.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/">
            <Button className="accent-primary hover:accent-primary text-white px-8 py-3 text-lg">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="px-8 py-3 text-lg">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Helpful Options */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5 text-blue-600" />
                What you might be looking for
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="font-medium text-slate-800">Dashboard</p>
                <p className="text-sm text-slate-600">View your financial overview and recent activity</p>
              </Link>
              <Link href="/login" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="font-medium text-slate-800">Sign In</p>
                <p className="text-sm text-slate-600">Access your account and financial data</p>
              </Link>
              <Link href="/register" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="font-medium text-slate-800">Get Started</p>
                <p className="text-sm text-slate-600">Create a new account and start tracking expenses</p>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-green-600" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/about" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="font-medium text-slate-800">About Optifi</p>
                <p className="text-sm text-slate-600">Learn more about our platform and features</p>
              </Link>
              <Link href="/contact" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="font-medium text-slate-800">Contact Support</p>
                <p className="text-sm text-slate-600">Get help from our support team</p>
              </Link>
              <a href="#" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="font-medium text-slate-800">Help Center</p>
                <p className="text-sm text-slate-600">Browse our documentation and guides</p>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Fun Financial Quote */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <p className="text-lg text-slate-700 italic mb-2">
            "A budget is telling your money where to go instead of wondering where it went."
          </p>
          <p className="text-sm text-slate-600">— Dave Ramsey</p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            If you believe this is an error, please{' '}
            <Link href="/contact" className="accent-text hover:underline">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}