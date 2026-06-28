"use client";

import { useIssuer } from "@/hooks/useIssuer";

export default function IssuerStatus() {
  const { data } = useIssuer();

  if (!data) {
    return <div>No issuer</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
