export type Project = {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  created_at: string;
};

export type Generation = {
  id: string;
  project_id: string;
  owner_id: string;
  prompt: string;
  context: string;
  target_language: string;
  result_code: string;
  explanation: string;
  model: string;
  created_at: string;
};
