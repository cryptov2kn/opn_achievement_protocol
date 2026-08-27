export type CredentialStatus = "valid" | "revoked";

export interface Credential {
  id: string;

  issuer_id: string;

  achievement_id: string;

  event_id: string | null;

  recipient_address: string;

  token_id: string | null;

  status: CredentialStatus;

  issued_at: string;

  revoked_at: string | null;

  transaction_hash: string | null;

  revoke_transaction_hash: string | null;

  created_at: string;

  updated_at: string;

  achievement: {
    id: string;
    title: string;
    category: string | null;
    difficulty: string | null;
  } | null;

  event: {
    id: string;
    title: string;
    image: string | null;
  } | null;
}
