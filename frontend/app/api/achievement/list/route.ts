import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const wallet = searchParams.get("wallet")?.toLowerCase();

    // Validate wallet
    if (!wallet) {
      return errorResponse("Wallet is required.", 400);
    }

    // Find issuer
    const { issuer, issuerError } = await getIssuerByWallet(wallet);

    if (issuerError) {
      return errorResponse(issuerError.message, 500);
    }

    if (!issuer) {
      return errorResponse("Issuer not found.", 404);
    }

    // Get achievements
    const { data, error } = await supabaseServer
      .from("achievements")
      .select("*")
      .eq("issuer_id", issuer.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}
