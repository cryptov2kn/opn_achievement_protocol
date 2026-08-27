"use client";

import { Credential } from "@/types/credential";

interface Props {
  credential: Credential;
}

function shortenAddress(address: string) {
  if (!address) return "-";

  if (address.length <= 14) return address;

  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

export default function CredentialDetailHeader({ credential }: Props) {
  const isValid = credential.status === "valid";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-black p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Event Image */}
        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          {credential.event?.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={credential.event.image}
              alt={credential.achievement?.title ?? "Event"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-zinc-500">
              No Image
            </div>
          )}
        </div>

        {/* Main Info */}
        <div className="min-w-0">
          <p className="text-xs tracking-wider text-zinc-500 uppercase">
            Achievement
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            {credential.achievement?.title ?? "Achievement"}
          </h2>

          <div className="mt-3">
            <span
              className={
                isValid
                  ? "inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400"
                  : "inline-flex rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-400"
              }
            >
              {isValid ? "✓ Valid" : "✕ Revoked"}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs text-zinc-500 uppercase">Recipient</p>

            <p
              className="mt-1 font-mono text-sm text-zinc-300"
              title={credential.recipient_address}
            >
              {shortenAddress(credential.recipient_address)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
