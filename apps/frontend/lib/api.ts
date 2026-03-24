export async function apiFetch(path: string, token: string, init?: RequestInit) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}
