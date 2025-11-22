'use client';

import { useState, useEffect } from 'react';
import { Heart, Activity, BookOpen, Wind, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import SplashScreen from '@/components/custom/splash-screen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  // Função para completar o splash e mostrar conteúdo principal
  const handleSplashComplete = () => {
    console.log('✅ SplashScreen completado - mostrando conteúdo principal');
    setShowSplash(false);
  };

  // Se ainda está mostrando splash, renderiza apenas ele
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Após splash, renderiza o conteúdo principal
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Seu espaço de paz e equilíbrio
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Bem-vindo ao{' '}
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Serenar
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Entenda, acompanhe e reduza a ansiedade de forma simples, humana e acolhedora.
              Um passo de cada vez, no seu ritmo.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Card 1 - Monitoramento */}
            <Link href="/monitoramento" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Monitoramento Emocional
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Registre como você está se sentindo e acompanhe sua jornada
                </p>
              </div>
            </Link>

            {/* Card 2 - Diário */}
            <Link href="/diario" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Diário Guiado
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Expresse seus pensamentos e sentimentos em um espaço seguro
                </p>
              </div>
            </Link>

            {/* Card 3 - Exercícios */}
            <Link href="/exercicios" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Wind className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Exercícios de Respiração
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Técnicas guiadas para acalmar a mente e o corpo
                </p>
              </div>
            </Link>

            {/* Card 4 - Gráficos */}
            <Link href="/evolucao" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Evolução
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Visualize seu progresso e celebre suas conquistas
                </p>
              </div>
            </Link>

            {/* Card 5 - SOS */}
            <Link href="/sos" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  SOS - Crise
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Técnicas rápidas para momentos de ansiedade intensa
                </p>
              </div>
            </Link>

            {/* Card 6 - Assistente */}
            <Link href="/assistente" className="group">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-teal-400">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Assistente de Apoio
                </h3>
                <p className="text-teal-50 text-sm">
                  Converse com nosso assistente inteligente a qualquer momento
                </p>
              </div>
            </Link>

          </div>

          {/* Daily Quote */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 text-center">
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 italic mb-2">
              "A ansiedade não esvazia o amanhã de suas tristezas, mas apenas esvazia o hoje de sua força."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              — Charles Spurgeon
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
