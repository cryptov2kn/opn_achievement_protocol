import { Credential } from "@/types/credential";

import CredentialRow from "./CredentialRow";

interface Props {
  credentials: Credential[];
}

export default function CredentialTable({ credentials }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="bg-zinc-900/80 text-xs tracking-wider text-zinc-500 uppercase">
              <th className="px-5 py-4 font-medium">Achievement</th>

              <th className="px-5 py-4 font-medium">User</th>

              <th className="px-5 py-4 font-medium">Status</th>

              <th className="px-5 py-4 font-medium">Issued</th>
            </tr>
          </thead>

          <tbody>
            {credentials.map((credential) => (
              <CredentialRow key={credential.id} credential={credential} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
