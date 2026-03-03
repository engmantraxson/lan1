'use client';

import { allTopics } from '@/lib/topics';
import { Star, Check, Lock, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // We will display the first 100 topics on the dashboard as requested
  const dashboardTopics = allTopics.slice(0, 100).filter(topic => 
    difficultyFilter === 'all' || topic.difficulty === difficultyFilter
  );

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-full bg-green-700 text-white rounded-2xl p-6 mb-4 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-2xl font-bold mb-1">Section 1: Rookie</h2>
          <p className="text-green-100">Get started with the basics</p>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          <Star size={32} fill="currentColor" />
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="w-full flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 text-slate-500 font-bold mr-2">
          <Filter size={20} />
          <span>Filter:</span>
        </div>
        {['all', 'easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => setDifficultyFilter(level)}
            className={`px-4 py-2 rounded-xl font-bold capitalize transition-colors whitespace-nowrap ${
              difficultyFilter === level 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="relative w-full flex flex-col items-center gap-4">
        {dashboardTopics.map((topic, index) => {
          // Calculate horizontal offset for the snake path
          // A simple pattern: 0, 1, 2, 1, 0, -1, -2, -1
          const cycle = index % 8;
          let offset = 0;
          if (cycle === 1 || cycle === 7) offset = 40;
          if (cycle === 2 || cycle === 6) offset = 80;
          if (cycle === 3 || cycle === 5) offset = 40;
          if (cycle === 4) offset = 0;
          
          // Alternate direction every 8 items
          const direction = Math.floor(index / 4) % 2 === 0 ? 1 : -1;
          const translateX = offset * direction;

          const isCurrent = topic.progress > 0 && topic.progress < 100 && !topic.locked;
          
          return (
            <div 
              key={topic.id} 
              className="relative flex flex-col items-center"
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {/* Connecting Line (except for first item) */}
              {index > 0 && (
                <div 
                  className="absolute w-2 -top-8 -z-10"
                  style={{ 
                    height: '40px',
                    backgroundColor: topic.locked ? '#e2e8f0' : '#15803d',
                  }}
                />
              )}

              <Link href={`/lesson/${topic.id}`}>
                <div className="relative group">
                  {/* Floating Label for current topic */}
                  {isCurrent && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white border-2 border-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl whitespace-nowrap z-10 animate-bounce shadow-sm">
                      START
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-slate-200 transform rotate-45"></div>
                    </div>
                  )}

                  {/* Topic Button */}
                  <div 
                    className={`
                      w-[70px] h-[70px] rounded-full flex items-center justify-center border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all
                      ${topic.completed ? 'bg-green-700 border-green-800' : 
                        topic.locked ? 'bg-slate-200 border-slate-300' : 
                        `${topic.color.replace('500', '700')} border-black/20`}
                    `}
                  >
                    {topic.completed ? (
                      <Check size={32} className="text-white" strokeWidth={4} />
                    ) : topic.locked ? (
                      <Lock size={32} className="text-slate-600" strokeWidth={3} />
                    ) : (
                      <topic.icon size={32} className="text-white" strokeWidth={2.5} />
                    )}
                  </div>

                  {/* Circular Progress Ring for current */}
                  {isCurrent && (
                    <svg className="absolute -top-2 -left-2 w-[86px] h-[86px] -z-10 transform -rotate-90">
                      <circle 
                        cx="43" cy="43" r="39" 
                        stroke="#e2e8f0" strokeWidth="8" fill="none" 
                      />
                      <circle 
                        cx="43" cy="43" r="39" 
                        stroke="#a16207" strokeWidth="8" fill="none" 
                        strokeDasharray="245" 
                        strokeDashoffset={245 - (245 * topic.progress) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
