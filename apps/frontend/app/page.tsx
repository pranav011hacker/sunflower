"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function HomePage() {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email || "");
    });
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <main className="container">
      <h1>🌻 Sunflower Code Studio</h1>
      <p>Codex-like MVP with GitHub OAuth + Supabase + FastAPI orchestration.</p>

      <div className="card">
        {email ? (
          <>
            <p>Signed in as <strong>{email}</strong></p>
            <a href="/dashboard"><button>Open Dashboard</button></a>
            <button style={{ marginLeft: 8 }} onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={signIn}>Sign in with GitHub</button>
        )}
      </div>
    </main>
  );
}
