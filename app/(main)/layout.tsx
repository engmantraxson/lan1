'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Shield, 
  Store, 
  User, 
  MoreHorizontal,
  Flame,
  Gem,
  Heart
} from 'lucide-react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'LEARN' },
    { href: '/review', icon: BookOpen, label: 'PRACTICE' },
    { href: '/leaderboard', icon: Shield, label: 'LEADERBOARDS' },
    { href: '/quests', icon: Store, label: 'QUESTS' },
    { href: '/profile', icon: User, label: 'PROFILE' },
    { href: '/more', icon: MoreHorizontal, label: 'MORE' },
  ];

  return (
    <div className="flex min-h-screen bg-white text-slate-700 font-sans">
      {/* Left Sidebar */}
      <nav className="hidden md:flex flex-col w-64 border-r-2 border-slate-200 p-4 fixed h-full bg-white z-10">
        <div className="mb-8 px-4">
          <h1 className="text-3xl font-extrabold text-green-500 tracking-tight">lingolearn</h1>
        </div>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-blue-50 text-blue-500 border-2 border-blue-200' 
                    : 'text-slate-500 hover:bg-slate-100 border-2 border-transparent'
                }`}
              >
                <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />
                <span className="tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b-2 border-slate-200 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-orange-500 font-bold">
          <Flame fill="currentColor" size={24} />
          <span>12</span>
        </div>
        <div className="flex items-center gap-2 text-blue-500 font-bold">
          <Gem fill="currentColor" size={24} />
          <span>500</span>
        </div>
        <div className="flex items-center gap-2 text-red-500 font-bold">
          <Heart fill="currentColor" size={24} />
          <span>5</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-24 md:pb-0 pt-16 md:pt-0 flex justify-center">
        <div className="w-full max-w-[1056px] flex p-4 md:p-6 gap-12">
          <div className="flex-1 max-w-[600px] mx-auto">
            {children}
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block w-[300px] pt-4">
            <div className="flex justify-between mb-8">
              <div className="flex items-center gap-2 text-orange-500 font-bold hover:bg-slate-100 p-2 rounded-xl cursor-pointer transition-colors">
                <Flame fill="currentColor" size={28} />
                <span>12</span>
              </div>
              <div className="flex items-center gap-2 text-blue-500 font-bold hover:bg-slate-100 p-2 rounded-xl cursor-pointer transition-colors">
                <Gem fill="currentColor" size={28} />
                <span>500</span>
              </div>
              <div className="flex items-center gap-2 text-red-500 font-bold hover:bg-slate-100 p-2 rounded-xl cursor-pointer transition-colors">
                <Heart fill="currentColor" size={28} />
                <span>5</span>
              </div>
            </div>

            <div className="border-2 border-slate-200 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-lg mb-4 text-slate-700">Unlock Leaderboards!</h3>
              <div className="flex items-center gap-4">
                <Shield size={48} className="text-yellow-500" />
                <p className="text-slate-500 text-sm">Complete 10 more lessons to start competing.</p>
              </div>
            </div>

            <div className="border-2 border-slate-200 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-700">Daily Quests</h3>
                <Link href="/quests" className="text-blue-500 font-bold text-sm hover:text-blue-600">VIEW ALL</Link>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Flame size={32} className="text-orange-500" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-slate-700">Earn 50 XP</p>
                    <div className="w-full bg-slate-200 rounded-full h-4 mt-2">
                      <div className="bg-orange-500 h-4 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t-2 border-slate-200 p-2 flex justify-around z-10">
        {navItems.slice(0, 5).map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`p-3 rounded-xl transition-colors ${
                isActive ? 'bg-blue-50 text-blue-500 border-2 border-blue-200' : 'text-slate-400 border-2 border-transparent'
              }`}
            >
              <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
