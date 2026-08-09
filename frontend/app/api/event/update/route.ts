import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      wallet: rawWallet,
      achievementId,
      title,
      description,
      eventType,
      location,
      startDate,
      endDate,
      maxParticipants,
    } = body;

    const wallet = rawWallet?.toLowerCase();

    if (!id) {
      return errorResponse("Event ID is required.", 400);
    }

    if (!wallet) {
      return errorResponse("Wallet is required.", 400);
    }

    if (!achievementId) {
      return errorResponse("Achievement is required.", 400);
    }

    if (!title?.trim()) {
      return errorResponse("Event title is required.", 400);
    }

    if (!eventType) {
      return errorResponse("Event type is required.", 400);
    }

    if (eventType !== "online" && eventType !== "offline") {
      return errorResponse("Invalid event type.", 400);
    }

    if (!location?.trim()) {
      return errorResponse(
        eventType === "online"
          ? "Event link is required."
          : "Venue is required.",
        400,
      );
    }

    if (!startDate) {
      return errorResponse("Start date is required.", 400);
    }

    if (!endDate) {
      return errorResponse("End date is required.", 400);
    }

    if (new Date(endDate) < new Date(startDate)) {
      return errorResponse("End date cannot be before start date.", 400);
    }

    if (!maxParticipants || Number(maxParticipants) <= 0) {
      return errorResponse("Participants must be greater than 0.", 400);
    }

    const { issuer, issuerError } = await getIssuerByWallet(wallet);

    if (issuerError) {
      return errorResponse(issuerError.message, 500);
    }

    if (!issuer) {
      return errorResponse("Issuer not found. Please register first.", 404);
    }

    // Make sure this event belongs to the connected issuer.
    const { data: existingEvent, error: existingEventError } =
      await supabaseServer
        .from("events")
        .select("id, issuer_id")
        .eq("id", id)
        .eq("issuer_id", issuer.id)
        .single();

    if (existingEventError || !existingEvent) {
      return errorResponse("Event not found.", 404);
    }

    // Make sure the selected achievement belongs to this issuer.
    const { data: achievement, error: achievementError } = await supabaseServer
      .from("achievements")
      .select("id")
      .eq("id", achievementId)
      .eq("issuer_id", issuer.id)
      .single();

    if (achievementError || !achievement) {
      return errorResponse(
        "Achievement not found or does not belong to this issuer.",
        404,
      );
    }

    const { data, error } = await supabaseServer
      .from("events")
      .update({
        achievement_id: achievementId,
        title: title.trim(),
        description: description?.trim() || null,
        event_type: eventType,
        location: location.trim(),
        start_date: startDate || null,
        end_date: endDate || null,
        max_participants: Number(maxParticipants),
      })
      .eq("id", id)
      .eq("issuer_id", issuer.id)
      .select(
        `
          *,
          achievement:achievements (
            id,
            title,
            image,
            points,
            category,
            difficulty
          )
        `,
      )
      .single();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}
