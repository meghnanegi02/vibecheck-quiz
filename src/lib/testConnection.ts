import { supabase } from './supabase';

export const testConnection = async () => {
  try {
    // Test database connection
    await supabase.rpc('test_db_connection');
    console.log('✅ Database connection successful');

    // Test real-time subscription
    const channel = supabase.channel('test-channel');
    const subscription = channel
      .on('postgres_changes', { event: '*', schema: 'public', table: 'responses' }, 
        (payload) => {
          console.log('✅ Real-time subscription working:', payload);
        }
      )
      .subscribe();

    // Cleanup subscription after 5 seconds
    setTimeout(() => {
      subscription.unsubscribe();
      console.log('✅ Real-time subscription cleanup successful');
    }, 5000);

    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  }
} 