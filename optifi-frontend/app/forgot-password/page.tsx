import ForgotPasswordForm from "@/components/client/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            Forgot Password
          </h1>
          <p className="text-slate-600 mb-8 text-center">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
