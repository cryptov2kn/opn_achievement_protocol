import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Archive achievement.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { id, wallet: rawWallet } = body;

    const wallet = rawWallet?.toLowerCase();

    // Validate wallet
    if (!wallet) {
      return errorResponse("Wallet is required.", 400);
    }

    // Validate id
    if (!id) {
      return errorResponse("Achievement id is required.", 400);
    }

    // Find issuer by wallet
    const { issuer, issuerError } = await getIssuerByWallet(wallet);

    if (issuerError) {
      return errorResponse(issuerError.message, 500);
    }

    if (!issuer) {
      return errorResponse("Issuer not found.", 404);
    }

    // Get achievement owner
    const { data: achievement, error: achievementError } = await supabaseServer
      .from("achievements")
      .select("issuer_id, status")
      .eq("id", id)
      .single();

    if (achievementError || !achievement) {
      return errorResponse("Achievement not found.", 404);
    }

    // Check ownership
    if (achievement.issuer_id !== issuer.id) {
      return errorResponse(
        "You are not allowed to archive this achievement.",
        403,
      );
    }

    // Already archived
    if (achievement.status === "archived") {
      return errorResponse("Achievement is already archived.", 400);
    }

    // Archive achievement
    const { error } = await supabaseServer
      .from("achievements")
      .update({
        status: "archived",
        archived_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(null);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}
