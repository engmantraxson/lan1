import { MoreHorizontal, Settings, HelpCircle, LogOut, Bell } from 'lucide-react';

export default function MorePage() {
  const items = [
    { icon: Settings, label: 'Settings' },
    { icon: Bell, label: 'Notifications' },
    { icon: HelpCircle, label: 'Help Center' },
    { icon: LogOut, label: 'Sign Out', color: 'text-red-500' },
  ];

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-slate-500 p-4 rounded-2xl text-white shadow-sm">
          <MoreHorizontal size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-700">More</h1>
          <p className="text-slate-500">Settings and additional options</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <button 
              key={i} 
              className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors text-left"
            >
              <Icon size={28} className={item.color || 'text-slate-500'} />
              <span className={`font-bold text-lg ${item.color || 'text-slate-700'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
