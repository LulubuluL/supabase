import { createClient } from "@supabase/supabase-js";

export function useSupabase() {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;
  return createClient(supabaseUrl, supabaseKey);
}
