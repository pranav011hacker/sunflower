"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { apiFetch } from "../../lib/api";

type Project = { id: string; name: string; description?: string; created_at: string };

export default function DashboardPage() {
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const access = data.session?.access_token || "";
      if (!access) {
        window.location.href = "/";
        return;
      }
      setToken(access);
      const response = await apiFetch("/api/v1/projects", access);
      setProjects(response.items || []);
    };
    init();
  }, []);

  const createProject = async () => {
    const created = await apiFetch("/api/v1/projects", token, {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
    setProjects([created, ...projects]);
    setName("");
    setDescription("");
  };

  return (
    <main className="container">
      <h1>Dashboard</h1>
      <div className="card">
        <h3>Create Project</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button onClick={createProject}>Create</button>
      </div>

      <div className="card">
        <h3>Your Projects</h3>
        {projects.map((p) => (
          <div key={p.id} style={{ marginBottom: 12 }}>
            <a href={`/projects/${p.id}`}><strong>{p.name}</strong></a>
            <div>{p.description}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
