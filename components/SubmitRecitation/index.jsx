import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

const isValidUrl = (value) => {
  try {
    const u = new URL(value);
    return !!u?.protocol?.startsWith('http');
  } catch {
    return false;
  }
};

const SubmitRecitation = () => {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setStatus({ ok: false, msg: "Please paste a valid link." });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || 'Failed to submit');
      setStatus({ ok: true, msg: "Thanks! We'll review your recitation." });
      setUrl("");
    } catch (e) {
      setStatus({ ok: false, msg: e.message || 'Submission failed' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-header px-3 py-2 text-sm uppercase tracking-wide flex items-center justify-between">
        <span>Submit a Recitation</span>
        <span data-tooltip-id="submit-info" className="cursor-help">
          <AiOutlineInfoCircle size={16} />
        </span>
        <Tooltip id="submit-info" place="bottom" className="z-50" style={{ maxWidth: 240 }}>
          <div className="text-xs">
            We accept links from YouTube, Instagram, Twitter/X, and direct MP3 links.
          </div>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit} className="p-3 flex items-center space-x-2">
        <input
          type="url"
          inputMode="url"
          placeholder="Paste link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={busy}
          className="px-3 py-2 text-xs font-bold rounded bg-amber-500 text-black border border-black disabled:opacity-50"
        >
          {busy ? 'Posting…' : 'Submit'}
        </button>
      </form>
      {status && (
        <div className={`px-3 pb-3 text-xs ${status.ok ? 'text-green-400' : 'text-red-400'}`}>
          {status.msg}
        </div>
      )}
    </div>
  );
};

export default SubmitRecitation;