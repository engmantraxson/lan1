import { Shield } from 'lucide-react';

export default function LeaderboardPage() {
  const users = [
    { name: 'Alex', xp: 1250, isMe: false },
    { name: 'You', xp: 1100, isMe: true },
    { name: 'Sarah', xp: 950, isMe: false },
    { name: 'Mike', xp: 800, isMe: false },
    { name: 'Emma', xp: 750, isMe: false },
    { name: 'David', xp: 600, isMe: false },
    { name: 'Lisa', xp: 550, isMe: false },
    { name: 'James', xp: 400, isMe: false },
  ];

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-yellow-500 p-4 rounded-2xl text-white shadow-sm">
          <Shield size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-700">Leaderboards</h1>
          <p className="text-slate-500">Compete with others and earn rewards!</p>
        </div>
      </div>
      
      <div className="border-2 border-slate-200 rounded-2xl overflow-hidden">
        {users.map((user, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-4 p-4 border-b-2 border-slate-200 last:border-b-0 ${
              user.isMe ? 'bg-blue-50' : 'hover:bg-slate-50'
            }`}
          >
            <div className={`font-bold w-6 text-center ${
              i === 0 ? 'text-yellow-500' : 
              i === 1 ? 'text-slate-400' : 
              i === 2 ? 'text-amber-600' : 'text-slate-400'
            }`}>
              {i + 1}
            </div>
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 font-bold text-slate-700">{user.name}</div>
            <div className="font-bold text-slate-500">{user.xp} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
}
