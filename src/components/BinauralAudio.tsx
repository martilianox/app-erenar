'use client';

import { useEffect, useRef } from 'react';

export default function BinauralAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Tenta tocar a música binaural automaticamente
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.warn('Autoplay bloqueado pelo navegador. Música tocará após interação do usuário.');
        }
      }
    };

    playAudio();
  }, []);

  return (
    <audio
      ref={audioRef}
      src="https://freesound.org/data/previews/191/191872_3255611-lq.mp3" // Exemplo de áudio binaural público (substitua pelo seu arquivo)
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}</content>
<parameter name="path">src/components/BinauralAudio.tsx