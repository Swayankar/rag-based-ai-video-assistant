import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export const api = axios.create({ baseURL: API_BASE });

export function createJob({ file, youtubeUrl, language }) {
  const form = new FormData();
  form.append("language", language);
  if (file) form.append("file", file);
  if (youtubeUrl) form.append("youtube_url", youtubeUrl);
  return api.post("/api/jobs", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function subscribeToJob(jobId, onUpdate, onError) {
  const source = new EventSource(`${API_BASE}/api/jobs/${jobId}/stream`);
  source.onmessage = (evt) => {
    try {
      onUpdate(JSON.parse(evt.data));
    } catch (e) {
      // ignore malformed frame
    }
  };
  source.onerror = (e) => {
    onError?.(e);
    source.close();
  };
  return () => source.close();
}

export function askQuestion(jobId, question) {
  return api.post(`/api/jobs/${jobId}/chat`, { question });
}

export function downloadUrl(jobId, fmt) {
  return `${API_BASE}/api/jobs/${jobId}/download?fmt=${fmt}`;
}
