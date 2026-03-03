'use client';

import { allTopics } from '@/lib/topics';
import { BookOpen, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function ReviewPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = allTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightMatch = (text: string, match: string) => {
    if (!match) return text;
    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === match.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 text-yellow-800 rounded-sm px-0.5">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-500 p-4 rounded-2xl text-white">
          <BookOpen size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-700">Grammar Bank</h1>
          <p className="text-slate-500">Review all 500 topics and concepts</p>
        </div>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-slate-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search topics..."
          className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-slate-700 font-bold focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => (
          <div 
            key={topic.id}
            className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${topic.color}`}>
              <topic.icon size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-700">
                {highlightMatch(topic.title, searchTerm)}
              </h3>
              <p className="text-sm text-slate-500 mb-1">
                {topic.completed ? 'Mastered' : topic.locked ? 'Locked' : 'In Progress'}
              </p>
              <p className="text-xs text-slate-400 italic">
                {topic.example}
              </p>
            </div>
            <div className="w-16 bg-slate-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${topic.completed ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${topic.completed ? 100 : topic.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTopics.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="font-bold text-lg">No topics found</p>
          <p>Try a different search term</p>
        </div>
      )}
    </div>
  );
}
