import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export const supabase = isSupabaseConfigured ? createClient(url, key) : null;

// Edge functions answer errors with a JSON body ({ error }); supabase-js hands
// back the raw Response, so unwrap it into a readable message.
export async function callFunction(name, body) {
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (!error) return { data };

  let message = "Something went wrong. Please try again.";
  let extra = null;
  try {
    extra = await error.context.json();
    if (extra?.error) message = extra.error;
  } catch {
    /* body was not JSON */
  }
  return { error: message, extra };
}
