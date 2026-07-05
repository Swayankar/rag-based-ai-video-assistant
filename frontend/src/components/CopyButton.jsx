import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked - silently ignore */
    }
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono
        transition-colors ${
          copied
            ? "border-teal/40 bg-teal/10 text-teal"
            : "border-line bg-panel2 text-muted hover:text-cream hover:border-amber/40"
        }`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : label}
    </button>
  );
}
