"use client";

import { useState } from "react";

export default function RegisterIssuer() {
  const [name, setName] = useState("");
  const [metadata, setMetadata] = useState("");

  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="text-2xl font-bold text-white">Become an Issuer</h2>

        <p className="mt-2 text-zinc-400">
          Register your organization to issue verifiable achievements and
          credentials.
        </p>

        <div className="mt-8 space-y-6">
          <div>
            <label className="text-zinc-300">Organization Name</label>

            <input
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-zinc-300">Metadata URI</label>

            <input
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white"
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
            />
          </div>

          <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500">
            Register Issuer
          </button>
        </div>
      </div>
    </div>
  );
}
