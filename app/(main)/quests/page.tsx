import { Store, Flame, Target, Zap } from 'lucide-react';

export default function QuestsPage() {
  const quests = [
    { title: 'Earn 50 XP', progress: 15, total: 50, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500' },
    { title: 'Get 4 perfect lessons', progress: 1, total: 4, icon: Target, color: 'text-blue-500', bg: 'bg-blue-500' },
    { title: 'Listen to 10 audio exercises', progress: 3, total: 10, icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500' },
  ];

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-500 p-4 rounded-2xl text-white shadow-sm">
          <Store size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-700">Quests</h1>
          <p className="text-slate-500">Complete daily challenges to earn gems.</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {quests.map((quest, i) => {
          const Icon = quest.icon;
          const percent = (quest.progress / quest.total) * 100;
          return (
            <div key={i} className="border-2 border-slate-200 rounded-2xl p-6 flex items-center gap-6">
              <Icon size={48} className={quest.color} />
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="font-bold text-lg text-slate-700">{quest.title}</h3>
                  <span className="font-bold text-slate-400">{quest.progress} / {quest.total}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4">
                  <div className={`h-4 rounded-full ${quest.bg}`} style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
