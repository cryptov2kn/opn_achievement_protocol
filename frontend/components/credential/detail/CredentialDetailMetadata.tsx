import { Credential } from "@/types/credential";

interface Props {
  credential: Credential;
}

function shortenHash(value: string | null) {
  if (!value) return "-";

  if (value.length <= 18) {
    return value;
  }

  return `${value.slice(0, 10)}...${value.slice(-8)}`;
}

function formatDate(value: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MetadataItem({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-violet-500/30">
      <p className="text-xs tracking-wider text-zinc-500 uppercase">{label}</p>

      <p
        className={`mt-2 text-sm break-all text-zinc-200 ${
          mono ? "font-mono" : "font-medium"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function CredentialDetailMetadata({ credential }: Props) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">🔗</span>

        <div>
          <h2 className="text-xl font-semibold text-white">Metadata</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Credential and blockchain information.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetadataItem label="Credential ID" value={credential.id} mono />

        <MetadataItem
          label="Achievement ID"
          value={credential.achievement_id}
          mono
        />

        <MetadataItem
          label="Recipient"
          value={credential.recipient_address}
          mono
        />

        <MetadataItem
          label="Token ID"
          value={credential.token_id ?? "-"}
          mono
        />

        <MetadataItem
          label="Issue Transaction"
          value={shortenHash(credential.transaction_hash)}
          mono
        />

        <MetadataItem
          label="Revoke Transaction"
          value={shortenHash(credential.revoke_transaction_hash)}
          mono
        />

        <MetadataItem
          label="Issued At"
          value={formatDate(credential.issued_at)}
        />

        <MetadataItem
          label="Revoked At"
          value={formatDate(credential.revoked_at)}
        />
      </div>
    </section>
  );
}
