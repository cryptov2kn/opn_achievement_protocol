import { IssuerFormData } from "@/types/issuer";

/**
 * Create a new issuer.
 */
export async function createIssuer(form: IssuerFormData, wallet: string) {
  const response = await fetch("/api/issuer/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...form,
      wallet,
    }),
  });

  return response.json();
}
