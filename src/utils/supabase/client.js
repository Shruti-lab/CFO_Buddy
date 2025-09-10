import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a proper Supabase client or a mock that won't crash the app
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase credentials. Using mock client.');
    return {
      from: (table) => ({
        select: () => ({
          order: () => ({
            gte: () => Promise.resolve({ data: [], error: null }),
            then: (callback) => Promise.resolve(callback({ data: [], error: null }))
          }),
          then: (callback) => Promise.resolve(callback({ data: [], error: null }))
        })
      })
    };
  }

  try {
    const client = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
    return client;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return {
      from: (table) => ({
        select: () => ({
          order: () => ({
            gte: () => Promise.resolve({ data: [], error: null }),
            then: (callback) => Promise.resolve(callback({ data: [], error: null }))
          }),
          then: (callback) => Promise.resolve(callback({ data: [], error: null }))
        })
      })
    };
  }
};

export const supabase = createSupabaseClient();
