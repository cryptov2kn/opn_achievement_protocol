import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      wallet: rawWallet,
      title,
      category,
      difficulty,
      description,
      image,
      expiration,
      metadata,
    } = body;

    const wallet = rawWallet?.toLowerCase();

    // Validate wallet
    if (!wallet) {
      return errorResponse("Wallet is required.", 400);
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
      return errorResponse("Issuer not found. Please register first.", 404);
    }

    // Create achievement
    const { data, error } = await supabaseServer
      .from("achievements")
      .insert({
        issuer_id: issuer.id,
        title,
        category,
        difficulty,
        description,
        image,
        expiration: expiration || null,
        metadata: metadata
          ? {
              note: metadata.trim(),
            }
          : null,
      })
      .select()
      .single();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data, 201);
  } catch (error) {
    console.error("Unexpected error:", error);

    return errorResponse("Internal server error.", 500);
  }
}
