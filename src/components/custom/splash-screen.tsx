'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Inicia o fade out após 4 segundos
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    // Completa a transição após 5 segundos total
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="splash-wrapper">
      {/* seu conteúdo */}
    </div>
  );
};

export default SplashScreen;