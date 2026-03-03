'use client';

import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans p-4 text-center">
      <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-6xl mb-8">
        🦉
      </div>
      <h1 className="text-4xl font-extrabold text-slate-700 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-xl text-slate-500 mb-8 max-w-md">
        It looks like you've wandered off the learning path. Let's get you back on track!
      </p>
      
      <button 
        onClick={() => router.push('/')}
        className="flex items-center gap-2 py-4 px-8 rounded-2xl font-bold text-xl bg-green-500 text-white shadow-[0_4px_0_0_#16a34a] hover:bg-green-400 active:translate-y-1 active:shadow-none transition-all"
      >
        <Home size={24} />
        BACK TO HOME
      </button>
    </div>
  );
}
