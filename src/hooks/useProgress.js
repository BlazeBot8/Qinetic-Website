import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

// Everything the learner has earned so far. RLS scopes every query to the
// signed-in user, so no user id is passed from the client.
export function useProgress() {
  const { user } = useAuth();
  const [state, setState] = useState({
    loading: Boolean(user),
    badges: [],
    name: "",
    certificate: null,
    attempts: [],
  });

  const refresh = useCallback(async () => {
    if (!supabase || !user) {
      setState((s) => ({ ...s, loading: false, badges: [], certificate: null }));
      return;
    }
    const [badges, profile, cert, attempts] = await Promise.all([
      supabase.from("badges").select("module, earned_at"),
      supabase.from("profiles").select("display_name").maybeSingle(),
      supabase.from("certificates").select("code, issued_at").maybeSingle(),
      supabase
        .from("attempts")
        .select("id, kind, module, score, total, passed, created_at")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);
    setState({
      loading: false,
      badges: (badges.data ?? []).map((b) => b.module),
      name: profile.data?.display_name ?? "",
      certificate: cert.data ?? null,
      attempts: attempts.data ?? [],
    });
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return { ...state, refresh };
}
