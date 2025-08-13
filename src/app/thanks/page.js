"use client";
import { useEffect, useState } from "react";

export default function Thanks() {
  const [links, setLinks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const session_id = new URLSearchParams(window.location.search).get("session_id");
    if (!session_id) { setError("Missing session id"); return; }

    fetch(`/api/stripe/claim?session_id=${session_id}`)
      .then(r => r.json())
      .then(d => d.links ? setLinks(d.links) : setError(d.error || "Could not fetch link"))
      .catch(() => setError("Network error"));
  }, []);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!links) return <div className="p-6">Preparing your download…</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Thank you for your purchase 🎉</h1>
      <ul className="list-disc ml-6 space-y-2">
        {links.map((l, i) => (
          <li key={i}>
            <a className="underline" target="_blank" rel="noreferrer" href={l.url}>
              Download {l.title}
            </a>{" "}
            <span className="text-sm text-gray-500">(valid 1 hour)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
