import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Link2, Film, Languages, PlayCircle, X } from "lucide-react";

const LANGUAGES = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "hinglish", label: "Hinglish", flag: "🇮🇳" },
];

export default function UploadPanel({ onSubmit, disabled }) {
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [language, setLanguage] = useState("english");
  const [dragActive, setDragActive] = useState(false);
  const [mode, setMode] = useState("file"); // "file" | "youtube"
  const inputRef = useRef(null);

  const handleDrag = useCallback((e, active) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(active);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      setMode("file");
      setYoutubeUrl("");
    }
  }, []);

  function handleBrowse(e) {
    const chosen = e.target.files?.[0];
    if (chosen) {
      setFile(chosen);
      setMode("file");
      setYoutubeUrl("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (mode === "file" && file) {
      onSubmit({ file, language });
    } else if (mode === "youtube" && youtubeUrl.trim()) {
      onSubmit({ youtubeUrl: youtubeUrl.trim(), language });
    }
  }

  const canSubmit = (mode === "file" && !!file) || (mode === "youtube" && youtubeUrl.trim().length > 5);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
        {/* Drop zone */}
        <motion.div
          onDragEnter={(e) => handleDrag(e, true)}
          onDragOver={(e) => handleDrag(e, true)}
          onDragLeave={(e) => handleDrag(e, false)}
          onDrop={handleDrop}
          animate={{
            borderColor: dragActive ? "#E8A33D" : "#2E3444",
            scale: dragActive ? 1.01 : 1,
          }}
          className="relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed
                     bg-panel/60 px-6 py-10 text-center shadow-panel"
        >
          {!file ? (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-panel2 ring-1 ring-line">
                <UploadCloud size={26} className="text-amber" />
              </div>
              <p className="font-display text-lg text-cream">
                Drop a recording here
              </p>
              <p className="text-sm text-muted">
                MP4, MOV, MP3, WAV - or browse your files
              </p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-1 rounded-full bg-panel2 px-4 py-2 text-sm font-medium text-cream ring-1 ring-line
                           transition hover:ring-amber/50 hover:text-amber"
              >
                Browse files
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="video/*,audio/*"
                className="hidden"
                onChange={handleBrowse}
              />
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber/10 ring-1 ring-amber/40">
                <Film size={24} className="text-amber" />
              </div>
              <p className="max-w-full truncate px-4 font-display text-lg text-cream">
                {file.name}
              </p>
              <p className="text-xs font-mono text-muted">
                {(file.size / (1024 * 1024)).toFixed(1)} MB ready to roll 🎬
              </p>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="mt-1 inline-flex items-center gap-1 rounded-full bg-panel2 px-3 py-1.5 text-xs text-muted
                           ring-1 ring-line transition hover:text-danger hover:ring-danger/40"
              >
                <X size={13} /> Remove
              </button>
            </>
          )}
        </motion.div>

        {/* Right column: youtube url + language */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-panel/60 p-5 shadow-panel">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-cream">
              <Link2 size={15} className="text-teal" /> Or paste a YouTube link
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value);
                setMode("youtube");
                setFile(null);
              }}
              className="w-full rounded-xl border border-line bg-ink/60 px-3.5 py-2.5 text-sm text-cream
                         placeholder:text-muted/70 outline-none transition focus:border-teal/60"
            />
          </div>

          <div className="rounded-2xl border border-line bg-panel/60 p-5 shadow-panel">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-cream">
              <Languages size={15} className="text-amber" /> Spoken language
            </label>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  type="button"
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`rounded-xl border px-3 py-2.5 text-sm transition ${
                    language === lang.value
                      ? "border-amber/60 bg-amber/10 text-amber"
                      : "border-line bg-ink/40 text-muted hover:text-cream"
                  }`}
                >
                  <span className="mr-1.5">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-muted">
          🔒 Processed on your own backend - nothing is stored beyond this session.
        </p>
        <button
          type="submit"
          disabled={!canSubmit || disabled}
          className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink
                     shadow-lg shadow-amber/20 transition enabled:hover:bg-amber2 disabled:cursor-not-allowed
                     disabled:opacity-40"
        >
          <PlayCircle size={18} />
          Run assistant
        </button>
      </div>
    </form>
  );
}
