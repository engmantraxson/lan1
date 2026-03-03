'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { X, Heart, Check, XCircle, Trophy } from 'lucide-react';
import { motion, Reorder } from 'motion/react';
import useSound from 'use-sound';
import Confetti from 'react-confetti';

const mockQuestions = [
  {
    type: 'translate',
    question: 'Translate this sentence',
    text: 'The cat is eating an apple.',
    options: ['El gato', 'come', 'una manzana', 'El perro', 'bebe', 'agua'],
    correctAnswer: ['El gato', 'come', 'una manzana'],
    explanation: '"El gato" means the cat, "come" means is eating, and "una manzana" means an apple.'
  },
  {
    type: 'select',
    question: 'Select the correct image for "Apple"',
    options: [
      { id: 1, text: 'Manzana', icon: '🍎' },
      { id: 2, text: 'Naranja', icon: '🍊' },
      { id: 3, text: 'Plátano', icon: '🍌' },
      { id: 4, text: 'Uva', icon: '🍇' }
    ],
    correctAnswer: 1,
    explanation: '"Manzana" is the Spanish word for Apple. "Naranja" is orange, "Plátano" is banana, and "Uva" is grape.'
  }
];

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [playCorrect] = useSound('https://www.soundjay.com/buttons/sounds/button-09.mp3', { volume: 0.5 });
  const [playIncorrect] = useSound('https://www.soundjay.com/buttons/sounds/button-10.mp3', { volume: 0.5 });
  const [playComplete] = useSound('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3', { volume: 0.5 });
  const [playHover] = useSound('https://www.soundjay.com/buttons/sounds/button-16.mp3', { volume: 0.2 });

  useEffect(() => {
    if (lessonId) {
      const savedProgress = localStorage.getItem(`lesson-progress-${lessonId}`);
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          setCurrentQuestion(parsed.currentQuestion || 0);
          setProgress(parsed.progress || 0);
          setSelectedWords(parsed.selectedWords || []);
          setSelectedOption(parsed.selectedOption || null);
          setStatus(parsed.status || 'idle');
        } catch (e) {
          console.error("Failed to parse saved progress", e);
        }
      }
      setIsLoaded(true);
    }
  }, [lessonId]);

  useEffect(() => {
    if (isLoaded && lessonId && !showCelebration) {
      localStorage.setItem(`lesson-progress-${lessonId}`, JSON.stringify({
        currentQuestion,
        progress,
        selectedWords,
        selectedOption,
        status
      }));
    } else if (showCelebration && lessonId) {
      localStorage.removeItem(`lesson-progress-${lessonId}`);
    }
  }, [currentQuestion, progress, selectedWords, selectedOption, status, isLoaded, lessonId, showCelebration]);

  const question = mockQuestions[currentQuestion];

  const handleCheck = () => {
    if (status === 'idle') {
      let isCorrect = false;
      if (question.type === 'translate' && Array.isArray(question.correctAnswer)) {
        isCorrect = selectedWords.join(' ') === question.correctAnswer.join(' ');
      } else if (question.type === 'select' && typeof question.correctAnswer === 'number') {
        isCorrect = selectedOption === question.correctAnswer;
      }

      if (isCorrect) {
        playCorrect();
      } else {
        playIncorrect();
      }

      setStatus(isCorrect ? 'correct' : 'incorrect');
    } else {
      // Move to next question
      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedWords([]);
        setSelectedOption(null);
        setStatus('idle');
        setProgress(((currentQuestion + 1) / mockQuestions.length) * 100);
      } else {
        // Finish lesson
        setProgress(100);
        setShowCelebration(true);
        playComplete();
      }
    }
  };

  const isCheckDisabled = 
    status === 'idle' && 
    ((question.type === 'translate' && selectedWords.length === 0) ||
     (question.type === 'select' && selectedOption === null));

  if (!isLoaded) {
    return (
      <div className="flex h-screen bg-white items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-green-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white font-sans relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 max-w-5xl mx-auto w-full gap-4">
        <button onClick={() => router.push('/')} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={32} strokeWidth={2.5} />
        </button>
        <div className="flex-1 bg-slate-200 h-4 rounded-full overflow-hidden">
          <div 
            className="bg-green-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-2 text-red-500 font-bold">
          <Heart fill="currentColor" size={28} />
          <span className="text-xl">5</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-slate-700 mb-8 self-start">{question.question}</h1>
        
        {question.type === 'translate' && (
          <div className="w-full flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 bg-blue-100 rounded-2xl flex items-center justify-center text-6xl">
                🦉
              </div>
              <div className="relative border-2 border-slate-200 rounded-2xl p-4 text-lg text-slate-700">
                {question.text}
                <div className="absolute top-1/2 -left-2.5 w-4 h-4 bg-white border-b-2 border-l-2 border-slate-200 transform -translate-y-1/2 rotate-45"></div>
              </div>
            </div>

            {/* Selected Words Area */}
            <Reorder.Group 
              axis="x" 
              values={selectedWords} 
              onReorder={status === 'idle' ? setSelectedWords : () => {}} 
              className="min-h-[60px] border-b-2 border-slate-200 flex flex-wrap gap-2 pb-2"
            >
              {selectedWords.map((word, i) => {
                const isWrong = status === 'incorrect' && Array.isArray(question.correctAnswer) && word !== question.correctAnswer[i];
                const isCorrectPos = status === 'incorrect' && Array.isArray(question.correctAnswer) && word === question.correctAnswer[i];
                return (
                  <Reorder.Item
                    key={word}
                    value={word}
                    drag={status === 'idle'}
                    className={`flex items-center gap-2 px-4 py-2 border-2 rounded-xl font-bold shadow-sm transition-colors ${
                      status === 'idle' ? 'cursor-grab active:cursor-grabbing' : ''
                    } ${
                      isWrong
                        ? 'border-red-400 bg-red-50 text-red-500'
                        : isCorrectPos
                        ? 'border-green-400 bg-green-50 text-green-600'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    <span>{word}</span>
                    {status === 'idle' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWords(words => words.filter(w => w !== word));
                        }}
                        className="text-slate-400 hover:text-slate-600 rounded-full p-0.5 hover:bg-slate-200 transition-colors"
                      >
                        <X size={16} strokeWidth={3} />
                      </button>
                    )}
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            {/* Available Words */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {(question.options as string[]).map((word, i) => {
                const isSelected = selectedWords.includes(word);
                return (
                  <motion.button
                    key={i}
                    disabled={isSelected}
                    onClick={() => setSelectedWords(words => [...words, word])}
                    onMouseEnter={() => {
                      if (!isSelected) playHover();
                    }}
                    whileHover={!isSelected ? { scale: 1.05, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" } : {}}
                    whileTap={!isSelected ? { scale: 0.95, y: 4, boxShadow: "none" } : {}}
                    className={`px-4 py-2 border-2 rounded-xl font-bold transition-colors ${
                      isSelected 
                        ? 'bg-slate-200 border-slate-200 text-transparent shadow-none' 
                        : 'border-slate-200 text-slate-700 shadow-[0_4px_0_0_#e2e8f0] hover:bg-slate-50'
                    }`}
                  >
                    {word}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {question.type === 'select' && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {question.options.map((opt: any) => {
              const isSelected = selectedOption === opt.id;
              const isWrong = status === 'incorrect' && isSelected && selectedOption !== question.correctAnswer;
              const isActuallyCorrect = status === 'incorrect' && opt.id === question.correctAnswer;
              
              return (
                <button
                  key={opt.id}
                  onClick={() => status === 'idle' && setSelectedOption(opt.id)}
                  className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl transition-all ${
                    isWrong
                      ? 'border-red-400 bg-red-50 text-red-500 shadow-[0_4px_0_0_#f87171]'
                      : isActuallyCorrect
                      ? 'border-green-400 bg-green-50 text-green-500 shadow-[0_4px_0_0_#4ade80]'
                      : isSelected
                      ? 'border-blue-400 bg-blue-50 text-blue-500 shadow-[0_4px_0_0_#60a5fa]'
                      : 'border-slate-200 text-slate-700 shadow-[0_4px_0_0_#e2e8f0] hover:bg-slate-50 hover:scale-105 hover:shadow-md'
                  } ${status === 'idle' ? 'active:translate-y-1 active:shadow-none active:scale-100' : ''}`}
                >
                  <span className="text-6xl mb-4">{opt.icon}</span>
                  <span className="font-bold text-lg">{opt.text}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t-2 p-4 sm:p-8 transition-colors ${
        status === 'correct' ? 'bg-green-100 border-green-200' :
        status === 'incorrect' ? 'bg-red-100 border-red-200' :
        'bg-white border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {status === 'correct' && (
              <>
                <div className="bg-white p-2 rounded-full text-green-500">
                  <Check size={32} strokeWidth={4} />
                </div>
                <h2 className="text-2xl font-bold text-green-600">Excellent!</h2>
              </>
            )}
            {status === 'incorrect' && (
              <>
                <div className="bg-white p-2 rounded-full text-red-500">
                  <XCircle size={32} strokeWidth={4} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-600">Correct solution:</h2>
                  <p className="text-red-500 font-bold mt-1">
                    {question.type === 'translate' && Array.isArray(question.correctAnswer)
                      ? question.correctAnswer.join(' ')
                      : (question.options as any[]).find((o: any) => o.id === question.correctAnswer)?.text}
                  </p>
                  {question.explanation && (
                    <p className="text-red-700/80 text-sm mt-2 font-medium max-w-md">
                      <span className="font-bold">Hint:</span> {question.explanation}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          
          <button
            onClick={handleCheck}
            disabled={isCheckDisabled}
            className={`w-full sm:w-auto min-w-[150px] py-3 px-8 rounded-xl font-bold text-lg transition-all ${
              isCheckDisabled
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : status === 'correct'
                ? 'bg-green-500 text-white shadow-[0_4px_0_0_#16a34a] hover:bg-green-400 active:translate-y-1 active:shadow-none'
                : status === 'incorrect'
                ? 'bg-red-500 text-white shadow-[0_4px_0_0_#dc2626] hover:bg-red-400 active:translate-y-1 active:shadow-none'
                : 'bg-green-500 text-white shadow-[0_4px_0_0_#16a34a] hover:bg-green-400 active:translate-y-1 active:shadow-none'
            }`}
          >
            {status === 'idle' ? 'CHECK' : 'CONTINUE'}
          </button>
        </div>
      </div>

      {/* Completion Modal */}
      {showCelebration && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <Confetti
            width={typeof window !== 'undefined' ? window.innerWidth : 800}
            height={typeof window !== 'undefined' ? window.innerHeight : 600}
            recycle={false}
            numberOfPieces={500}
            gravity={0.15}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 60 }}
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
            className="flex flex-col items-center w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl relative z-50"
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1, 
                delay: 0.5,
                repeat: Infinity, 
                repeatDelay: 2 
              }}
              className="text-yellow-500 mb-6"
            >
              <Trophy size={100} strokeWidth={1.5} />
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-extrabold text-slate-700 mb-2 text-center"
            >
              Lesson Complete!
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-500 mb-8 text-center"
            >
              You've earned 15 XP today.
            </motion.p>

            <div className="w-full flex flex-col gap-3">
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  const nextId = lessonId.startsWith('topic-') 
                    ? `topic-${parseInt(lessonId.replace('topic-', '')) + 1}`
                    : 'topic-1';
                  router.push(`/lesson/${nextId}`);
                }}
                className="w-full py-4 px-8 rounded-2xl font-bold text-xl bg-green-500 text-white shadow-[0_4px_0_0_#16a34a] hover:bg-green-400 active:translate-y-1 active:shadow-none transition-all"
              >
                CONTINUE TO NEXT LESSON
              </motion.button>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => router.push('/')}
                className="w-full py-4 px-8 rounded-2xl font-bold text-xl text-slate-500 hover:bg-slate-100 transition-all"
              >
                BACK TO HOME
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
