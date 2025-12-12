import SignInForm from '../components/SignInForm';
import { MessageSquare } from 'lucide-react';

function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg shadow-green-500/30 mb-4">
            <MessageSquare className="text-white" size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Incoweb CRM
          </h1>
          <p className="text-sm text-gray-600">
            Business Suite - Manage your customer relationships
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back
            </h2>
            <p className="text-sm text-gray-600">
              Sign in to access your dashboard
            </p>
          </div>

          <SignInForm />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">
                Secure authentication
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignIn;