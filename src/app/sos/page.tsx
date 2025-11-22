'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/custom/navbar';
import { Heart, Wind, Phone, MessageCircle, Sparkles, Shield, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const quickTechniques = [
  {
    id: 'grounding-5-4-3-2-1',
    name: 'Grounding 5-4-3-2-1',
    icon: Shield,
    color: 'from-blue-500 to-indigo-600',
    steps: [
      '5 coisas que você pode VER ao seu redor',
      '4 coisas que você pode TOCAR',
      '3 coisas que você pode OUVIR',
      '2 coisas que você pode CHEIRAR',
      '1 coisa que você pode SABOREAR'
    ],
    description: 'Técnica para te trazer de volta ao momento presente'
  },
  {
    id: 'breathing-emergency',
    name: 'Respiração de Emergência',
    icon: Wind,
    color: 'from-teal-500 to-cyan-600',
    steps: [
      'Inspire pelo nariz contando até 3',
      'Segure o ar por 3 segundos',
      'Expire pela boca contando até 6',
      'Repita por 2 minutos'
    ],
    description: 'Acalma o sistema nervoso rapidamente'
  },
  {
    id: 'safe-place',
    name: 'Lugar Seguro',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    steps: [
      'Feche os olhos suavemente',
      'Imagine um lugar onde você se sente completamente seguro',
      'Visualize os detalhes: cores, sons, cheiros',
      'Permaneça neste lugar mental por alguns minutos',
      'Respire profundamente e volte quando estiver pronto'
    ],
    description: 'Visualização para criar sensação de segurança'
  }
];

export default function SOSPage() {
  const [selectedTechnique, setSelectedTechnique] = useState(quickTechniques[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showContactsModal, setShowContactsModal] = useState(false);

  // Carregar contatos do localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('trustedContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const startTechnique = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < selectedTechnique.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
      setCurrentStep(0);
    }
  };

  const resetTechnique = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const handleCallContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Emergency Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4 shadow-lg border-2 border-red-300 dark:border-red-700">
              <Heart className="w-4 h-4 text-red-600 dark:text-red-400 animate-pulse" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">
                Modo Socorro Emocional Ativado
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Você está seguro
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Isso vai passar. Vamos juntos.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Escolha uma técnica rápida para acalmar a ansiedade agora
            </p>
          </div>

          {/* Calming Message */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-6 mb-8 border-2 border-blue-200 dark:border-blue-800 shadow-xl">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2 text-lg">
                  Lembre-se:
                </h3>
                <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                  <li>✓ Você está seguro neste momento</li>
                  <li>✓ Esta sensação é temporária e vai passar</li>
                  <li>✓ Você já superou isso antes e vai superar novamente</li>
                  <li>✓ Respire devagar, você está no controle</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technique Selection */}
          {!isActive && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {quickTechniques.map((technique) => {
                const Icon = technique.icon;
                return (
                  <button
                    key={technique.id}
                    onClick={() => setSelectedTechnique(technique)}
                    className={`p-6 rounded-2xl transition-all duration-300 ${
                      selectedTechnique.id === technique.id
                        ? `bg-gradient-to-br ${technique.color} text-white shadow-2xl scale-105`
                        : 'bg-white dark:bg-gray-800 hover:shadow-lg'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-3 mx-auto ${
                      selectedTechnique.id === technique.id
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                    <h3 className={`font-bold mb-2 ${
                      selectedTechnique.id === technique.id
                        ? 'text-white'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {technique.name}
                    </h3>
                    <p className={`text-sm ${
                      selectedTechnique.id === technique.id
                        ? 'text-white/90'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {technique.description}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* Technique Display */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-8">
            {!isActive ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedTechnique.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedTechnique.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {selectedTechnique.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl"
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedTechnique.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startTechnique}
                  className={`w-full bg-gradient-to-r ${selectedTechnique.color} text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}
                >
                  <Sparkles className="w-5 h-5" />
                  Começar Agora
                </button>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                    {currentStep + 1}/{selectedTechnique.steps.length}
                  </div>
                  <div className={`inline-block px-6 py-3 rounded-2xl bg-gradient-to-r ${selectedTechnique.color} text-white text-xl font-bold mb-6`}>
                    {selectedTechnique.steps[currentStep]}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={nextStep}
                    className={`flex-1 bg-gradient-to-r ${selectedTechnique.color} text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                  >
                    {currentStep < selectedTechnique.steps.length - 1 ? 'Próximo Passo' : 'Concluir'}
                  </button>
                  
                  <button
                    onClick={resetTechnique}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Parar
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Emergency Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/assistente">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Conversar com Assistente IA
              </button>
            </Link>
            
            <button 
              onClick={() => setShowContactsModal(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Ligar para Contato de Confiança
            </button>
          </div>

          {/* Professional Help */}
          <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-800">
            <p className="text-amber-900 dark:text-amber-100 text-center">
              <strong>Se a crise persistir:</strong> Considere buscar ajuda profissional. 
              CVV: 188 (24h) • CAPS: Busque o mais próximo
            </p>
          </div>

        </div>
      </main>

      {/* Contacts Modal */}
      {showContactsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contatos de Confiança
                </h2>
                <button
                  onClick={() => setShowContactsModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <span className="text-2xl text-gray-500 dark:text-gray-400">×</span>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Escolha alguém para ligar agora
              </p>
            </div>

            <div className="p-6">
              {contacts.length === 0 ? (
                <div className="text-center py-8">
                  <UserPlus className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Nenhum contato cadastrado
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Cadastre pessoas de confiança para ligar em momentos de crise
                  </p>
                  <Link href="/contatos">
                    <button
                      onClick={() => setShowContactsModal(false)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                    >
                      <UserPlus className="w-5 h-5" />
                      Cadastrar Contatos
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleCallContact(contact.phone)}
                      className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 rounded-2xl p-4 transition-all duration-300 hover:scale-105 border-2 border-green-200 dark:border-green-800 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {contact.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {contact.relationship}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}

                  <Link href="/contatos">
                    <button
                      onClick={() => setShowContactsModal(false)}
                      className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-5 h-5" />
                      Gerenciar Contatos
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
