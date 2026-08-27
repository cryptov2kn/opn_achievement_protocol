import { CredentialStatus as CredentialStatusType } from "@/types/credential";
import { clsx } from "clsx";

interface Props {
  status: CredentialStatusType;
}

export default function CredentialStatus({ status }: Props) {
  const config = {
    valid: {
      label: "✓ Valid",
      className: "bg-emerald-500/10 text-emerald-400",
    },

    revoked: {
      label: "✕ Revoked",
      className: "bg-red-500/10 text-red-400",
    },
  } as const;

  const current = config[status];

  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        current.className,
      )}
    >
      {current.label}
    </span>
  );
}
