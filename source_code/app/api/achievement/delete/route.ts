import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Delete achievement.
 */
export async function DELETE(request: Request) {
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
      .select("issuer_id")
      .eq("id", id)
      .single();

    if (achievementError || !achievement) {
      return errorResponse("Achievement not found.", 404);
    }

    // Check ownership
    if (achievement.issuer_id !== issuer.id) {
      return errorResponse(
        "You are not allowed to delete this achievement.",
        403,
      );
    }

    // Delete achievement
    const { error } = await supabaseServer
      .from("achievements")
      .delete()
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
