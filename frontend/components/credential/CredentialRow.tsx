"use client";

import { useRouter } from "next/navigation";

import CredentialStatus from "./CredentialStatus";

import { Credential } from "@/types/credential";

interface Props {
  credential: Credential;
}

function shortenAddress(address: string) {
  if (!address) return "-";

  if (address.length <= 12) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatIssuedDate(date: string) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function CredentialRow({ credential }: Props) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/credentials/${credential.id}`)}
      className="cursor-pointer border-t border-zinc-800 transition hover:bg-zinc-800/40"
    >
      {/* Event IMG */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          {credential.event?.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={credential.event.image}
              alt={credential.achievement?.title ?? "Event"}
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-500">
              -
            </div>
          )}

          <span className="font-medium text-white">
            {credential.achievement?.title ?? "Achievement"}
          </span>
        </div>
      </td>

      {/* User */}
      <td className="px-5 py-4 font-mono text-sm text-zinc-400">
        {shortenAddress(credential.recipient_address)}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <CredentialStatus status={credential.status} />
      </td>

      {/* Issued */}
      <td className="px-5 py-4 text-sm text-zinc-400">
        {formatIssuedDate(credential.issued_at)}
      </td>
    </tr>
  );
}
