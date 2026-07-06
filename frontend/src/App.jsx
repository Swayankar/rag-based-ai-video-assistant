import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Disc3, RefreshCcw } from "lucide-react";
import Working from "./components/Working.jsx";
import UploadPanel from "./components/UploadPanel.jsx";
import ProgressTracker from "./components/ProgressTracker.jsx";
import ResultsView from "./components/ResultsView.jsx";
import ChatPanel from "./components/ChatPanel.jsx";
import { createJob, subscribeToJob } from "./lib/api.js";

export default function App() {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = useCallback(async ({ file, youtubeUrl, language }) => {
    setSubmitting(true);
    setErrorMsg(null);
    setStatus(null);
    try {
      const { data } = await createJob({ file, youtubeUrl, language });
      setJobId(data.job_id);
      subscribeToJob(
        data.job_id,
        (update) => setStatus(update),
        () => {}
      );
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.detail || "Couldn't start the pipeline. Is the backend running?"
      );
    } finally {
      setSubmitting(false);
    }
  }, []);

  function reset() {
    setJobId(null);
    setStatus(null);
    setErrorMsg(null);
  }

  const isProcessing = jobId && status && status.status !== "done" && status.status !== "error";
  const isDone = status?.status === "done";

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-24 pt-10 sm:px-6">
      {/* Header */}
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-panel2 ring-1 ring-line">
            <Disc3 size={22} className="text-amber animate-reel" />
          </div>
          <div>
            <h1 className="font-display text-xl text-cream sm:text-2xl">AI Video Assistant</h1>
            <p className="text-xs text-muted">Studio for turning recordings into decisions</p>
          </div>
        </div>
        {(jobId || errorMsg) && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel2 px-4 py-2 text-sm
                       text-muted transition hover:text-cream hover:border-amber/40"
          >
            <RefreshCcw size={14} /> New meeting
          </button>
        )}
      </header>

      {/* Landing explainer + Upload (hidden once a job exists) */}
      {!jobId && (
        <>
          <Working />
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <UploadPanel onSubmit={handleSubmit} disabled={submitting} />
          {errorMsg && (
            <p className="mt-4 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              ⚠️ {errorMsg}
            </p>
          )}
          </motion.section>
        </>
      )}

      {/* Progress */}
      {jobId && !isDone && (
        <section className="mb-8">
          <ProgressTracker status={status} />
        </section>
      )}

      {/* Results + Chat */}
      {isDone && (
        <div className="flex flex-col gap-8">
          <ResultsView jobId={jobId} result={status.result} />
          <ChatPanel jobId={jobId} meetingTitle={status.result.title} />
        </div>
      )}

      {!jobId && (
        <footer className="mt-16 text-center text-xs text-muted">
          Built with FastAPI + React · yt-dlp · Whisper · LangChain · ChromaDB
        </footer>
      )}
    </div>
  );
}
