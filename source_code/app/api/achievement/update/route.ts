import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      wallet: rawWallet,
      id,
      title,
      category,
      difficulty,
      description,
      image,
      points,
      expiration,
      metadata,
    } = body;

    const wallet = rawWallet?.toLowerCase();

    // Validate wallet
    if (!wallet) {
      return errorResponse("Wallet is required.", 400);
    }

    // Validate id
    if (!id) {
      return errorResponse("Achievement id is required.", 400);
    }

    // Validate title
    if (!title) {
      return errorResponse("Achievement title is required.", 400);
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
        "You are not allowed to update this achievement.",
        403,
      );
    }

    // Update achievement
    const { data, error } = await supabaseServer
      .from("achievements")
      .update({
        title,
        category,
        difficulty,
        description,
        image,
        points: points ? Number(points) : null,
        expiration: expiration || null,
        metadata: metadata
          ? {
              note: metadata.trim(),
            }
          : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data);
  } catch (error) {
    console.error("Unexpected error:", error);

    return errorResponse("Internal server error.", 500);
  }
}
