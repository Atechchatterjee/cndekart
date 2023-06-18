import { env } from "@/env.mjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient({
  supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
