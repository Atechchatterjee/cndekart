import * as z from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  SUPABASE_DB_PASSWORD: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_DB_PASSWORD: process.env.NEXT_PUBLIC_SUPABASE_DB_PASSWORD,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
