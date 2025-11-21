'use client';

import { useState } from 'react';
import Navbar from '@/components/custom/navbar';
import { Activity, Heart, Brain, Zap, Clock, Save, TrendingUp } from 'lucide-react';

const moodLevels = [
  { value: 1, label: 'Muito Bem', color: 'from-green-400 to-emerald-500', emoji: '😊' },
  { value: 2, label: 'Bem', color: 'from-teal-400 to-cyan-500', emoji: '🙂' },
  { value: 3, label: 'Neutro', color: 'from-blue-400 to-indigo-500', emoji: '😐' },
  { value: 4, label: 'Ansioso', color: 'from-amber-400 to-orange-500', emoji: '😟' },
  { value: 5, label: 'Muito Ansioso', color: 'from-red-400 to-rose-500', emoji: '😰' },
];

const commonTriggers = [
  'Trabalho', 'Estudos', 'Relacionamentos', 'Saúde', 'Finanças',
  'Família', 'Solidão', 'Futuro', 'Redes Sociais', 'Notícias'
];

const physicalSymptoms = [
  'Taquicardia', 'Aperto no peito', 'Falta de ar', 'Tremores',
  'Suor excessivo', 'Tensão muscular', 'Dor de cabeça', 'Náusea',
  'Tontura', 'Formigamento'
];

export default function MonitoramentoPage() {
  const [anxietyLevel, setAnxietyLevel] = useState(3);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Aqui você salvaria os dados (localStorage, API, etc)
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-lg">
              <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Registro rápido em menos de 10 segundos
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Como você está se sentindo?
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Registre seu momento emocional de forma simples e acolhedora
            </p>
          </div>

          {/* Mood Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Como está seu humor agora?
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {moodLevels.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedMood === mood.value
                      ? `bg-gradient-to-br ${mood.color} border-transparent text-white shadow-lg scale-105`
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Anxiety Level */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Nível de ansiedade (1-10)
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Muito calmo</span>
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {anxietyLevel}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Muito ansioso</span>
              </div>
              
              <input
                type="range"
                min="1"
                max="10"
                value={anxietyLevel}
                onChange={(e) => setAnxietyLevel(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <span key={num}>{num}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Triggers */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                O que pode ter causado?
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {commonTriggers.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => toggleTrigger(trigger)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTriggers.includes(trigger)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {trigger}
                </button>
              ))}
            </div>
          </div>

          {/* Physical Symptoms */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Sintomas físicos percebidos
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {physicalSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Observações do dia (opcional)
              </h2>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Como você reagiu? O que ajudou? O que você sentiu?"
              className="w-full h-32 px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <TrendingUp className="w-5 h-5" />
                Registro salvo com sucesso!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Registro
              </>
            )}
          </button>

          {/* Encouragement Message */}
          {saved && (
            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center animate-fade-in">
              <p className="text-green-800 dark:text-green-300 font-medium">
                Você está cuidando de si mesmo. Continue assim! 💚
              </p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
