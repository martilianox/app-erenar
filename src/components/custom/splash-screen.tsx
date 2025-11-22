'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Inicia o fade out imediatamente
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 0);

    // Completa a transição após 4 segundos
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-wrapper ${fadeOut ? 'splash-fade-out' : ''}`}>
      <Image
        src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f173f31e-9594-4e42-8da4-1554ba4b5b9c.png"
        alt="Logo Serenar"
        width={200}
        height={100}
        className="splash-logo"
      />
    </div>
  );
};

export default SplashScreen;