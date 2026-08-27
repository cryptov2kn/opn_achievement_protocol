import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const wallet = searchParams.get("wallet")?.toLowerCase();

    if (!wallet) {
      return errorResponse("Wallet is required.", 400);
    }

    const { issuer, issuerError } = await getIssuerByWallet(wallet);

    if (issuerError) {
      return errorResponse(issuerError.message, 500);
    }

    if (!issuer) {
      return successResponse([]);
    }

    const { data, error } = await supabaseServer
      .from("credentials")
      .select(
        `
      *,
      achievement:achievements (
        id,
        title,
        category,
        difficulty
      ),
      event:events (
        id,
        title,
        image
      )
    `,
      )
      .eq("issuer_id", issuer.id)
      .order("issued_at", { ascending: false });

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}
