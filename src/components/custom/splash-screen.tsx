'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    console.log('🎬 SplashScreen montado - iniciando animação');

    // Inicia o fade out após 4 segundos
    const fadeTimer = setTimeout(() => {
      console.log('🌅 Iniciando fade out do SplashScreen');
      setFadeOut(true);
    }, 4000);

    // Completa a transição após 5 segundos total
    const completeTimer = setTimeout(() => {
      console.log('✅ SplashScreen completo - chamando onComplete');
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo com animação de pulse e fade - AUMENTADA PARA 2X E EM FORMATO CIRCULAR */}
        <div
          className={`relative w-64 h-64 sm:w-80 sm:h-80 transition-all duration-1000 ${
            fadeOut ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <Image
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/de0461f7-6fc2-43e0-8360-aac61911e20f.png"
            alt="Serenar Logo"
            fill
            className="object-contain animate-pulse rounded-full"
            priority
          />
        </div>

        {/* Nome do app */}
        <h1
          className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-1000 ${
            fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          Serenar
        </h1>

        {/* Tagline */}
        <p
          className={`text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center max-w-xs transition-all duration-1000 delay-200 ${
            fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          Seu espaço de paz e equilíbrio
        </p>

        {/* Loading indicator */}
        <div
          className={`flex gap-2 mt-4 transition-opacity duration-500 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
