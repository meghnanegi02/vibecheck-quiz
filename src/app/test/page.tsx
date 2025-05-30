'use client';

import { useEffect, useState } from 'react';
import { testSupabaseConnection } from '@/lib/testConnection';

export default function TestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    async function runTests() {
      const results: string[] = [];
      
      // Test 1: Environment Variables
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        results.push('❌ Missing Supabase environment variables');
      } else {
        results.push('✅ Environment variables are set');
      }

      // Test 2: Supabase Connection
      const connectionTest = await testSupabaseConnection();
      if (connectionTest) {
        results.push('✅ All connection tests passed');
      } else {
        results.push('❌ Connection tests failed');
      }

      setTestResults(results);
    }

    runTests();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">VibeCheck Connection Tests</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
          <ul className="space-y-2">
            {testResults.map((result, index) => (
              <li key={index} className="text-gray-700">{result}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
} 