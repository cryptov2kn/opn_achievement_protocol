import { supabaseServer } from "@/lib/supabase/server";

export async function getIssuerByWallet(wallet: string) {
  const normalizedWallet = wallet.toLowerCase();

  const { data, error } = await supabaseServer
    .from("issuers")
    .select("*")
    .eq("wallet", normalizedWallet)
    .maybeSingle();

  return {
    issuer: data,
    issuerError: error,
  };
}
