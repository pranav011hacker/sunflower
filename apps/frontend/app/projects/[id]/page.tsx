"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { apiFetch } from "../../../lib/api";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [token, setToken] = useState("");
  const [prompt, setPrompt] = useState("Build an API route for webhook verification in TypeScript");
  const [context, setContext] = useState("This is a Next.js + FastAPI monorepo.");
  const [language, setLanguage] = useState("typescript");
  const [result, setResult] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const access = data.session?.access_token || "";
      if (!access) {
        window.location.href = "/";
        return;
      }
      setToken(access);
    };
    init();
  }, []);

  const generate = async () => {
    const response = await apiFetch("/api/v1/generate", token, {
      method: "POST",
      body: JSON.stringify({
        project_id: params.id,
        prompt,
        context,
        target_language: language,
      }),
    });
    setExplanation(response.explanation);
    setResult(response.result_code);
  };

  return (
    <main className="container">
      <h1>Project Workspace</h1>
      <div className="card">
        <label>Prompt</label>
        <textarea rows={7} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <label>Context</label>
        <textarea rows={6} value={context} onChange={(e) => setContext(e.target.value)} />
        <label>Language</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="rust">Rust</option>
          <option value="go">Go</option>
        </select>
        <button onClick={generate}>Generate Code</button>
      </div>

      <div className="card">
        <h3>Explanation</h3>
        <p>{explanation}</p>
        <h3>Code</h3>
        <pre>{result}</pre>
      </div>
    </main>
  );
}
