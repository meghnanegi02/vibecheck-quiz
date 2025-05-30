'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { QuizProvider } from '@/context/QuizContext';
import { QuizSelector } from '@/components/QuizSelector';
import { Auth } from '@/components/Auth';

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <QuizProvider>
      <main className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">VibeCheck Live Quiz</h1>
            <button
              onClick={() => supabase.auth.signOut()}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Sign Out
            </button>
          </div>
          <QuizSelector />
        </div>
      </main>
    </QuizProvider>
  );
}
