import { StorageAdapter } from './types';
import { JsonStorageAdapter } from './jsonAdapter';
import { SupabaseStorageAdapter } from './supabaseAdapter';

let cachedAdapter: StorageAdapter | null = null;

function getEnv(key: string): string | undefined {
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {}
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env[key] || (import.meta as any).env[`VITE_${key}`];
    }
  } catch (e) {}
  return undefined;
}

export function getStorageAdapter(): StorageAdapter {
  if (cachedAdapter) {
    return cachedAdapter;
  }

  const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL') || getEnv('SUPABASE_URL');
  const supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnv('SUPABASE_ANON_KEY');
  const storageAdapterEnv = getEnv('STORAGE_ADAPTER');
  const nodeEnv = getEnv('NODE_ENV');

  if (storageAdapterEnv === 'supabase' || (supabaseUrl && supabaseKey && nodeEnv === 'production')) {
    cachedAdapter = new SupabaseStorageAdapter(supabaseUrl!, supabaseKey!);
  } else {
    cachedAdapter = new JsonStorageAdapter();
  }

  return cachedAdapter;
}


export * from './types';
export * from './jsonAdapter';
export * from './supabaseAdapter';
