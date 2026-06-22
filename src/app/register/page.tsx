"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, Loader2, User as UserIcon, Phone, CheckCircle2 } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch('password', '');

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setServerError('');

    try {
      const response = await axios.post('/api/auth/register', {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      if (response.status === 201) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setServerError(error.response.data.message || 'An error occurred during registration.');
      } else {
        setServerError('Network error. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[a-z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = calculateStrength(passwordValue);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f4f8fb] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#e6f7f6] mb-6">
            <CheckCircle2 className="h-10 w-10 text-[#009e90]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0a335c] mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-8">
            Your account has been created. We've sent a verification email to your address.
            Please check your inbox to verify your account.
          </p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

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
          Create an Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join us to manage your appointments easily
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl sm:px-10 border border-gray-100">

          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <p className="text-sm text-red-700 font-medium">{serverError}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-[#009e90] focus:border-[#009e90] sm:text-sm outline-none`}
                  placeholder="John Doe"
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-[#009e90] focus:border-[#009e90] sm:text-sm outline-none`}
                  placeholder="you@example.com"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-[#009e90] focus:border-[#009e90] sm:text-sm outline-none`}
                  placeholder="+1 (555) 000-0000"
                  {...register('phone')}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-[#009e90] focus:border-[#009e90] sm:text-sm outline-none`}
                  placeholder="••••••••"
                  {...register('password')}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {/* Password Strength Indicator */}
              {passwordValue.length > 0 && (
                <div className="mt-2 flex gap-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${strength >= 25 ? 'bg-red-500' : 'bg-transparent'}`} style={{ width: '25%' }}></div>
                  <div className={`h-full ${strength >= 50 ? 'bg-yellow-500' : 'bg-transparent'}`} style={{ width: '25%' }}></div>
                  <div className={`h-full ${strength >= 75 ? 'bg-green-400' : 'bg-transparent'}`} style={{ width: '25%' }}></div>
                  <div className={`h-full ${strength >= 100 ? 'bg-[#009e90]' : 'bg-transparent'}`} style={{ width: '25%' }}></div>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-[#009e90] focus:border-[#009e90] sm:text-sm outline-none`}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#009e90] focus:ring-[#009e90] border-gray-300 rounded cursor-pointer"
                  {...register('terms')}
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">
                  I agree to the <Link href="/terms" className="text-[#009e90] hover:underline">Terms & Conditions</Link>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0a335c] hover:bg-[#082a4d] focus:outline-none transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> Processing...</>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="font-medium text-[#009e90] hover:text-[#0a335c] transition-colors">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
