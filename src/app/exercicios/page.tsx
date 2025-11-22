'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/custom/navbar';
import { Wind, Play, Pause, RotateCcw, Heart, Brain, Sparkles } from 'lucide-react';

const exercises = [
  {
    id: '4-7-8',
    name: 'Respiração 4-7-8',
    description: 'Técnica calmante para reduzir ansiedade rapidamente',
    pattern: { inhale: 4, hold: 7, exhale: 8 },
    difficulty: 'Iniciante',
    benefits: 'Acalma o sistema nervoso, reduz ansiedade, melhora o sono'
  },
  {
    id: 'box',
    name: 'Respiração em Caixa',
    description: 'Usada por militares para manter a calma em situações de estresse',
    pattern: { inhale: 4, hold: 4, exhale: 4, holdAfter: 4 },
    difficulty: 'Intermediário',
    benefits: 'Aumenta foco, reduz estresse, melhora controle emocional'
  },
  {
    id: 'coherence',
    name: 'Coerência Cardíaca',
    description: 'Sincroniza respiração e batimentos cardíacos',
    pattern: { inhale: 5, hold: 0, exhale: 5 },
    difficulty: 'Iniciante',
    benefits: 'Equilibra sistema nervoso, reduz cortisol, melhora clareza mental'
  },
  {
    id: 'anti-panic',
    name: 'Respiração Anti-Pânico',
    description: 'Para momentos de crise intensa de ansiedade',
    pattern: { inhale: 3, hold: 3, exhale: 6 },
    difficulty: 'Iniciante',
    benefits: 'Interrompe ataques de pânico, acalma rapidamente, restaura controle'
  }
];

export default function ExerciciosPage() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdAfter'>('inhale');
  const [countdown, setCountdown] = useState(selectedExercise.pattern.inhale);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Limpar intervalo ao desmontar componente
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Lógica do timer regressivo
  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Avançar para próxima fase
          advancePhase();
          return 0;
        }
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentPhase, selectedExercise]);

  const advancePhase = () => {
    setCurrentPhase((prevPhase) => {
      let nextPhase: 'inhale' | 'hold' | 'exhale' | 'holdAfter' = 'inhale';
      let nextCountdown = selectedExercise.pattern.inhale;

      if (prevPhase === 'inhale') {
        if (selectedExercise.pattern.hold > 0) {
          nextPhase = 'hold';
          nextCountdown = selectedExercise.pattern.hold;
        } else {
          nextPhase = 'exhale';
          nextCountdown = selectedExercise.pattern.exhale;
        }
      } else if (prevPhase === 'hold') {
        nextPhase = 'exhale';
        nextCountdown = selectedExercise.pattern.exhale;
      } else if (prevPhase === 'exhale') {
        if (selectedExercise.pattern.holdAfter !== undefined && selectedExercise.pattern.holdAfter > 0) {
          nextPhase = 'holdAfter';
          nextCountdown = selectedExercise.pattern.holdAfter;
        } else {
          nextPhase = 'inhale';
          nextCountdown = selectedExercise.pattern.inhale;
        }
      } else if (prevPhase === 'holdAfter') {
        nextPhase = 'inhale';
        nextCountdown = selectedExercise.pattern.inhale;
      }

      setCountdown(nextCountdown);
      return nextPhase;
    });
  };

  const startExercise = () => {
    setIsPlaying(true);
  };

  const pauseExercise = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetExercise = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentPhase('inhale');
    setCountdown(selectedExercise.pattern.inhale);
  };

  const phaseLabels = {
    inhale: 'Inspire',
    hold: 'Segure',
    exhale: 'Expire',
    holdAfter: 'Segure'
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-lg">
              <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Técnicas cientificamente comprovadas
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Exercícios de Respiração
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Acalme sua mente e corpo com técnicas guiadas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Exercise List */}
            <div className="lg:col-span-1 space-y-4">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => {
                    setSelectedExercise(exercise);
                    setIsPlaying(false);
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current);
                    }
                    setCurrentPhase('inhale');
                    setCountdown(exercise.pattern.inhale);
                  }}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    selectedExercise.id === exercise.id
                      ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-xl scale-105'
                      : 'bg-white dark:bg-gray-800 hover:shadow-lg'
                  }`}
                >
                  <h3 className={`font-bold text-lg mb-2 ${
                    selectedExercise.id === exercise.id
                      ? 'text-white'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {exercise.name}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    selectedExercise.id === exercise.id
                      ? 'text-teal-50'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {exercise.description}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    selectedExercise.id === exercise.id
                      ? 'bg-white/20 text-white'
                      : 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300'
                  }`}>
                    {exercise.difficulty}
                  </span>
                </button>
              ))}
            </div>

            {/* Exercise Player */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                
                {/* Exercise Info */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {selectedExercise.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedExercise.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400">
                    <Sparkles className="w-4 h-4" />
                    <span>{selectedExercise.benefits}</span>
                  </div>
                </div>

                {/* Breathing Circle */}
                <div className="flex flex-col items-center justify-center mb-8">
                  <div className={`relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-1000 ${
                    isPlaying
                      ? currentPhase === 'inhale' || currentPhase === 'hold'
                        ? 'scale-110 bg-gradient-to-br from-teal-400 to-cyan-500'
                        : 'scale-90 bg-gradient-to-br from-blue-400 to-indigo-500'
                      : 'bg-gradient-to-br from-teal-400 to-cyan-500'
                  } shadow-2xl`}>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-white mb-2">
                        {countdown}
                      </div>
                      <div className="text-xl text-white font-medium">
                        {phaseLabels[currentPhase]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pattern Display */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">
                      {selectedExercise.pattern.inhale}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Inspire</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {selectedExercise.pattern.hold}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Segure</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                      {selectedExercise.pattern.exhale}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Expire</div>
                  </div>
                  
                  {selectedExercise.pattern.holdAfter !== undefined && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                        {selectedExercise.pattern.holdAfter}s
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Segure</div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  {!isPlaying ? (
                    <button
                      onClick={startExercise}
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Iniciar
                    </button>
                  ) : (
                    <button
                      onClick={pauseExercise}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <Pause className="w-5 h-5" />
                      Pausar
                    </button>
                  )}
                  
                  <button
                    onClick={resetExercise}
                    className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 border-2 border-gray-200 dark:border-gray-600"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reiniciar
                  </button>
                </div>

                {/* Tips */}
                <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-teal-200 dark:border-teal-800">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        Dicas para melhor resultado:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Encontre um lugar calmo e confortável</li>
                        <li>• Respire pelo nariz e expire pela boca</li>
                        <li>• Pratique por pelo menos 5 minutos</li>
                        <li>• Use fones de ouvido para melhor imersão</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
