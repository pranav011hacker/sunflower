"use client";

import { useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  useEffect(() => {
    const run = async () => {
      await supabase.auth.getSession();
      window.location.href = "/dashboard";
    };
    run();
  }, []);

  return <main className="container"><p>Signing you in…</p></main>;
}
