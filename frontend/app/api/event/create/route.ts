import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      wallet: rawWallet,

      achievementId,

      title,

      description,

      location,

      eventType,

      startDate,

      endDate,

      maxParticipants,
    } = body;

    const wallet = rawWallet?.toLowerCase();

    if (!wallet) {
      return errorResponse("Wallet is required.", 400);
    }

    if (!achievementId) {
      return errorResponse("Achievement is required.", 400);
    }

    if (!title) {
      return errorResponse("Event title is required.", 400);
    }

    const { issuer, issuerError } = await getIssuerByWallet(wallet);

    if (issuerError) {
      return errorResponse(issuerError.message, 500);
    }

    if (!issuer) {
      return errorResponse("Issuer not found. Please register first.", 404);
    }

    const { data, error } = await supabaseServer
      .from("events")
      .insert({
        issuer_id: issuer.id,

        achievement_id: achievementId,

        title,

        description,

        location,

        event_type: eventType,

        start_date: startDate || null,

        end_date: endDate || null,

        max_participants: maxParticipants ? Number(maxParticipants) : null,
      })
      .select()
      .single();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data, 201);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}
