import { LOGOS } from '@/public/logo/logo';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Yellow Gradient Background with Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-400 via-orange-400 to-red-600 overflow-hidden">
        {/* Decorative food pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-orange-400 rounded-full blur-2xl" />
        </div>

        {/* Logo at the top */}
       <Link className='cursor-pointer' href={"/"}>
        <div className="absolute top-6 left-8 z-10">
          <div className="flex items-center">
            <Image
              alt="BiteLooP Logo"
              src={LOGOS.LOGO}
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                BiteLooP
              </h1>
              <p className="text-sm text-yellow-100 font-medium">
                Food Delivery
              </p>
            </div>
          </div>
        </div>
       </Link>

        {/* Sticky Quote at the bottom - Left Aligned */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/30 to-transparent">
          <div className="max-w-sm text-left">
            <svg
              className="h-8 w-8 text-yellow-200 mb-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-white/95 text-base italic leading-relaxed font-medium">
              &quot;Craving something delicious? Let us bring the feast to your door — fast, fresh, and flavorful!&quot;
            </blockquote>
            <p className="text-yellow-200 text-sm mt-3 font-semibold">
              — BiteLooP Team
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 ">
        <div className="w-full max-w-md">
          {/* Mobile Logo (only visible on small screens) */}
          <div className="flex justify-center mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <Image
                alt="BiteLooP Logo"
                src={LOGOS.LOGO}
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">BiteLooP</h1>
                <p className="text-xs text-orange-500">Food Delivery</p>
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;