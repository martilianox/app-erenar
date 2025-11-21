'use client';

import { useState } from 'react';
import Navbar from '@/components/custom/navbar';
import { TrendingUp, Calendar, Brain, Heart, Activity, AlertCircle } from 'lucide-react';

// Mock data para demonstração
const weekData = [
  { day: 'Seg', anxiety: 7, mood: 3 },
  { day: 'Ter', anxiety: 5, mood: 4 },
  { day: 'Qua', anxiety: 8, mood: 2 },
  { day: 'Qui', anxiety: 6, mood: 3 },
  { day: 'Sex', anxiety: 4, mood: 5 },
  { day: 'Sáb', anxiety: 3, mood: 5 },
  { day: 'Dom', anxiety: 5, mood: 4 },
];

const insights = [
  {
    type: 'warning',
    icon: AlertCircle,
    color: 'from-amber-500 to-orange-500',
    message: 'Sua ansiedade aumentou nos últimos 3 dias. Considere praticar mais exercícios de respiração.'
  },
  {
    type: 'positive',
    icon: Heart,
    color: 'from-green-500 to-emerald-500',
    message: 'Você registrou seu humor por 7 dias seguidos! Continue assim.'
  },
  {
    type: 'pattern',
    icon: Brain,
    color: 'from-blue-500 to-indigo-500',
    message: 'Padrão identificado: Você tende a sentir mais ansiedade às quartas-feiras.'
  }
];

export default function EvolucaoPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  const maxAnxiety = Math.max(...weekData.map(d => d.anxiety));

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-lg">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Acompanhe seu progresso
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Sua Evolução
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Visualize padrões e celebre suas conquistas
            </p>
          </div>

          {/* Period Selector */}
          <div className="flex justify-center gap-2 mb-8">
            {(['week', 'month', 'year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  period === p
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg'
                }`}
              >
                {p === 'week' ? 'Semana' : p === 'month' ? 'Mês' : 'Ano'}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">5.7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Média de Ansiedade</div>
                </div>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">↓ 12% vs. semana passada</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">3.7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Humor Médio</div>
                </div>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">↑ 8% vs. semana passada</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Dias Registrados</div>
                </div>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Sequência atual</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Nível de Ansiedade - Última Semana
            </h2>
            
            <div className="flex items-end justify-between gap-2 h-64">
              {weekData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end h-full">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-xl transition-all duration-500 hover:from-blue-600 hover:to-indigo-600"
                      style={{ height: `${(data.anxiety / maxAnxiety) * 100}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {data.anxiety}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {data.day}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-indigo-500" />
                <span className="text-gray-600 dark:text-gray-400">Nível de Ansiedade</span>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Insights Personalizados
            </h2>
            
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl flex items-start gap-4"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${insight.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pt-2">
                    {insight.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Export Button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Exportar Relatório Completo (PDF)
          </button>

          {/* Professional Note */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <p className="text-purple-900 dark:text-purple-100 text-center text-sm">
              💡 <strong>Dica:</strong> Leve este relatório para seu psicólogo ou psiquiatra. 
              Ele ajuda profissionais a entenderem melhor seu quadro emocional.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
