// Tipos do app erenar

export interface MoodEntry {
  id: string;
  date: Date;
  mood: 'muito-bem' | 'bem' | 'neutro' | 'ansioso' | 'muito-ansioso';
  intensity: number; // 1-10
  triggers?: string[];
  notes?: string;
}

export interface DiaryEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: MoodEntry['mood'];
  gratitude?: string[];
  achievements?: string[];
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  duration: number; // em segundos
  pattern: {
    inhale: number;
    hold: number;
    exhale: number;
    holdAfter?: number;
  };
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
}

export interface CrisisTechnique {
  id: string;
  name: string;
  description: string;
  steps: string[];
  duration: number; // tempo estimado em minutos
  category: 'respiracao' | 'grounding' | 'distração' | 'relaxamento';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
