"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setServerError('');

    try {
      const response = await axios.post('/api/auth/login', data);

      if (response.status === 200) {
        const role = response.data.user.role.toLowerCase();
        // Redirect based on role
        if (role === 'admin') router.push('/admin');
        else if (role === 'doctor') router.push('/doctor');
        else if (role === 'staff') router.push('/staff');
        else router.push('/patient');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setServerError(error.response.data.message || 'An error occurred during login.');
      } else {
        setServerError('Network error. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8fb] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9.5" y="2" width="5" height="20" rx="1" fill="#0a335c" />
                <rect x="2" y="9.5" width="8" height="5" rx="1" fill="#0a335c" />
                <rect x="14" y="9.5" width="8" height="5" rx="1" fill="#009e90" />
              </svg>
            </div>
            <div className="ml-3 font-bold leading-none mt-1">
              <span className="text-2xl text-[#0a335c]">City</span>
              <span className="text-2xl text-[#009e90]">Care</span>
            </div>
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-[#0a335c]">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl sm:px-10 border border-gray-100">

          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {serverError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#009e90] focus:border-[#009e90]'} rounded-xl transition duration-200 outline-none sm:text-sm`}
                  placeholder="you@example.com"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#009e90] focus:border-[#009e90]'} rounded-xl transition duration-200 outline-none sm:text-sm`}
                  placeholder="••••••••"
                  {...register('password')}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#009e90] focus:ring-[#009e90] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-[#009e90] hover:text-[#0a335c] transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0a335c] hover:bg-[#082a4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a335c] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to CityCare?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="w-full flex justify-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
              >
                Create an account
              </Link>
            </div>

            {/* Admin Credentials Note */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              <p className="font-semibold mb-1">Demo Admin Credentials:</p>
              <p>Email: <strong>admin@citycare.com</strong></p>
              <p>Password: <strong>Password@123</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
