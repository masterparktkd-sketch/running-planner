'use client';

import Link from 'next/link';
import { Dumbbell, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Fitness Prompt Builder
          </h1>
          <p className="text-gray-600 text-lg">
            Create personalized AI prompts for your fitness journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/fitness">
            <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all cursor-pointer group hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                  <Dumbbell className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">General Fitness</h2>
              </div>
              <p className="text-gray-600">
                Comprehensive fitness prompt builder for workouts, nutrition, weekly plans, and progress tracking.
              </p>
              <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                Get Started 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          <Link href="/running">
            <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all cursor-pointer group hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl group-hover:from-orange-200 group-hover:to-red-200 transition-all">
                  <Activity className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Running Training</h2>
              </div>
              <p className="text-gray-600">
                Specialized running prompt builder for training plans, pacing strategies, injury prevention, and race prep.
              </p>
              <div className="mt-6 flex items-center text-orange-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                Get Started 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Built for creating AI-powered fitness coaching prompts
          </p>
        </div>
      </div>
    </div>
  );
}
