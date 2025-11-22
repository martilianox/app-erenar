'use client';

import { useState } from 'react';
import Navbar from '@/components/custom/navbar';
import { MessageCircle, Send, Sparkles, Heart, Brain, Wind } from 'lucide-react';

const quickActions = [
  { label: 'Estou ansioso agora', icon: Brain },
  { label: 'Preciso de técnicas de respiração', icon: Wind },
  { label: 'Como lidar com pensamentos acelerados?', icon: Sparkles },
  { label: 'Estou tendo uma crise', icon: Heart },
];

export default function AssistentePage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Eu sou seu assistente de apoio emocional. Estou aqui para te ouvir, acolher e ajudar. Como você está se sentindo agora?'
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');

    // Simular resposta da IA
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Entendo como você está se sentindo. Vamos trabalhar isso juntos. Que tal começarmos com uma respiração profunda?'
      }]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    setMessages([...messages, { role: 'user', content: action }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Vou te ajudar com isso. Vamos começar com algumas técnicas que podem te ajudar agora mesmo.'
      }]);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-serenar-blue/20 via-serenar-green/10 to-serenar-blue/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-8rem)]">
          
          {/* Header */}
          <div className="text-center mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 text-serenar-blue dark:text-serenar-blue" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Assistente disponível 24/7
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Assistente de Apoio
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Converse sobre o que você está sentindo
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl flex flex-col h-[calc(100%-12rem)]">
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-serenar-blue to-serenar-green text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-serenar-blue dark:text-serenar-blue" />
                        <span className="text-xs font-medium text-serenar-blue dark:text-serenar-blue">
                          Assistente
                        </span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.label)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-serenar-blue/10 dark:hover:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-serenar-blue dark:focus:border-serenar-blue focus:outline-none transition-colors"
                />
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-serenar-blue to-serenar-green text-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            Este assistente oferece apoio emocional, mas não substitui acompanhamento profissional
          </div>

        </div>
      </main>
    </>
  );
}