'use client';

import { useState } from 'react';
import Navbar from '@/components/custom/navbar';
import { BookOpen, Sparkles, Save, Download, Calendar } from 'lucide-react';

export default function DiarioPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [gratitude, setGratitude] = useState(['', '', '']);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateGratitude = (index: number, value: string) => {
    const newGratitude = [...gratitude];
    newGratitude[index] = value;
    setGratitude(newGratitude);
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-serenar-blue/20 via-serenar-green/10 to-serenar-blue/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-lg">
              <BookOpen className="w-4 h-4 text-serenar-blue dark:text-serenar-blue" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Seu espaço seguro de expressão
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Diário Emocional
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Expresse seus pensamentos e sentimentos livremente
            </p>
          </div>

          {/* Date Display */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-xl mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-serenar-blue dark:text-serenar-blue" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>

          {/* Title Input */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dê um título para este dia..."
              className="w-full text-2xl font-bold px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-serenar-blue dark:focus:border-serenar-blue focus:outline-none transition-colors"
            />
          </div>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-serenar-blue dark:text-serenar-blue" />
              O que você está sentindo?
            </h2>
            
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva livremente sobre seus pensamentos, sentimentos, medos, alegrias... Este é um espaço só seu, sem julgamentos."
              className="w-full h-64 px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-serenar-blue dark:focus:border-serenar-blue focus:outline-none transition-colors resize-none"
            />
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              💡 Dica: Escrever sobre o que sentimos ajuda a organizar pensamentos e reduzir a ansiedade
            </div>
          </div>

          {/* Gratitude Section */}
          <div className="bg-gradient-to-br from-serenar-green/20 to-serenar-blue/20 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              ✨ Três coisas pelas quais sou grato hoje
            </h2>
            
            <div className="space-y-3">
              {gratitude.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => updateGratitude(index, e.target.value)}
                  placeholder={`${index + 1}. Algo que trouxe alegria ou paz...`}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-serenar-green/50 dark:border-green-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-serenar-green dark:focus:border-serenar-green focus:outline-none transition-colors"
                />
              ))}
            </div>
            
            <div className="mt-4 text-sm text-serenar-green dark:text-green-300">
              🌟 Praticar gratidão diariamente reduz ansiedade e melhora o humor
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-serenar-blue to-serenar-green text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saved ? 'Salvo com sucesso!' : 'Salvar Diário'}
            </button>
            
            <button
              className="flex-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-gray-700"
            >
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="mt-6 bg-gradient-to-r from-serenar-green/50 to-serenar-blue/50 dark:from-green-900/20 dark:to-emerald-900/20 border border-serenar-green/50 dark:border-green-800 rounded-2xl p-6 text-center animate-fade-in">
              <p className="text-serenar-green dark:text-green-300 font-medium">
                Seu diário foi salvo. Você está cuidando da sua saúde emocional! 💚
              </p>
            </div>
          )}

          {/* AI Insights Placeholder */}
          <div className="mt-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-serenar-blue dark:text-serenar-blue" />
              <h3 className="font-bold text-gray-900 dark:text-white">
                Análise Inteligente (em breve)
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Em breve, nossa IA analisará seus registros para identificar padrões, gatilhos e sugerir ações personalizadas para seu bem-estar.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}