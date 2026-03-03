import { User, Flame, Gem, Shield, Zap, BookOpen } from 'lucide-react';
import { allTopics } from '@/lib/topics';

export default function ProfilePage() {
  const completedTopics = allTopics.filter(t => t.completed).length;
  const totalTopics = allTopics.length;
  const progressPercentage = Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="py-8">
      <div className="flex items-center gap-6 mb-8 border-b-2 border-slate-200 pb-8">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl shadow-sm">
          🦉
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-700">Learner</h1>
          <p className="text-slate-500 font-bold">Joined March 2026</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Overall Progress</h2>
      <div className="border-2 border-slate-200 rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-blue-500" />
            <span className="font-bold text-slate-700 text-lg">Course Completion</span>
          </div>
          <span className="font-bold text-slate-500">{completedTopics} / {totalTopics} Lessons</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
          <div 
            className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-right text-sm font-bold text-blue-500">{progressPercentage}% Complete</p>
      </div>

      <h2 className="text-2xl font-bold text-slate-700 mb-4">Statistics</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border-2 border-slate-200 rounded-2xl p-4 flex items-center gap-4">
          <Flame size={32} className="text-orange-500" />
          <div>
            <div className="font-bold text-xl text-slate-700">12</div>
            <div className="text-sm text-slate-500 font-bold">Day Streak</div>
          </div>
        </div>
        <div className="border-2 border-slate-200 rounded-2xl p-4 flex items-center gap-4">
          <Zap size={32} className="text-yellow-500" />
          <div>
            <div className="font-bold text-xl text-slate-700">1100</div>
            <div className="text-sm text-slate-500 font-bold">Total XP</div>
          </div>
        </div>
        <div className="border-2 border-slate-200 rounded-2xl p-4 flex items-center gap-4">
          <Shield size={32} className="text-yellow-500" />
          <div>
            <div className="font-bold text-xl text-slate-700">Silver</div>
            <div className="text-sm text-slate-500 font-bold">Current League</div>
          </div>
        </div>
        <div className="border-2 border-slate-200 rounded-2xl p-4 flex items-center gap-4">
          <Gem size={32} className="text-blue-500" />
          <div>
            <div className="font-bold text-xl text-slate-700">500</div>
            <div className="text-sm text-slate-500 font-bold">Gems</div>
          </div>
        </div>
      </div>
    </div>
  );
}
