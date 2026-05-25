'use client';

import AuthLayout from '@/components/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { toast } from 'sonner';

const SignUp = () => {
  const route = useRouter()
  const {signup} = useAuthStore()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false)
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await signup(formData)
      toast.success("Account Created Successfully!")
      route.push("/feed")
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
       setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold ">Sign Up Account</h2>
          <p className="mt-2 text-md">
            Enter your Information to create your account.
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 h-auto"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="">Google</span>
          </Button>

        
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t "></div>
          </div>
          <div className="relative flex z-10 justify-center text-sm">
            <span className="px-2  text-gray-500">Or</span>
          </div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="block text-sm font-medium opacity-60 mb-1">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="eg. John"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 h-auto"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="block text-sm font-medium opacity-60 mb-1">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="eg. Francisco"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 h-auto"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-medium opacity-60 mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="eg. johnfrans@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 h-auto"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium opacity-60 mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 h-auto"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Must be at least 8 characters.
            </p>
          </div>

          <Button
            variant={'default'}
            type="submit"
            className="w-full bg-red-500 text-white py-2.5 h-auto font-semibold  transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

         <div className="text-center mt-4">
        <p className="">
          Don't have an account?{" "}
          <Link href="/login">
            <Button
              variant="link"
              className="text-red-400 hover:text-red-600 p-0 h-auto font-medium"
            >
              Log In
            </Button>
          </Link>
        </p>
      </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;