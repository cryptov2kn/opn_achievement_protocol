import { Credential } from "@/types/credential";

export const PAGE_SIZE = 10;

export function filterCredentials(credentials: Credential[], keyword: string) {
  const search = keyword.trim().toLowerCase();

  if (!search) {
    return credentials;
  }

  return credentials.filter((credential) => {
    const text = [
      credential.achievement?.title ?? "",
      credential.recipient_address,
      credential.status,
      credential.token_id ?? "",
      credential.transaction_hash ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(search);
  });
}

export function sortCredentials(credentials: Credential[], sort: string) {
  const sorted = [...credentials];

  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.issued_at).getTime() - new Date(b.issued_at).getTime(),
      );

    case "valid":
      return sorted.sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status === "valid" ? -1 : 1;
      });

    case "revoked":
      return sorted.sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status === "revoked" ? -1 : 1;
      });

    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime(),
      );
  }
}

export function viewCredentials(credentials: Credential[], view: string) {
  switch (view) {
    case "valid":
      return credentials.filter((credential) => credential.status === "valid");

    case "revoked":
      return credentials.filter(
        (credential) => credential.status === "revoked",
      );

    default:
      return credentials;
  }
}

export function paginateCredentials(
  credentials: Credential[],
  page: number,
  pageSize: number = PAGE_SIZE,
) {
  const start = (page - 1) * pageSize;

  return credentials.slice(start, start + pageSize);
}

export function getTotalPages(
  totalItems: number,
  pageSize: number = PAGE_SIZE,
) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}
