import { errorResponse, successResponse } from "@/lib/api/response";
import { getIssuerByWallet } from "@/lib/issuer/getIssuerByWallet";
import { supabaseServer } from "@/lib/supabase/server";
import { DateTime } from "luxon";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      wallet: rawWallet,
      achievementId,
      title,
      description,
      image,
      eventType,
      location,
      startDate,
      startTime,
      endDate,
      endTime,
      timezone,
      maxParticipants,
      points,
    } = body;

    const wallet = rawWallet?.toLowerCase();

    // =========================
    // Basic validation
    // =========================

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

    // =========================
    // Date / Time validation
    // =========================

    if (!startDate) {
      return errorResponse("Start date is required.", 400);
    }

    if (!startTime) {
      return errorResponse("Start time is required.", 400);
    }

    if (!endDate) {
      return errorResponse("End date is required.", 400);
    }

    if (!endTime) {
      return errorResponse("End time is required.", 400);
    }

    if (!timezone) {
      return errorResponse("Timezone is required.", 400);
    }

    // =========================
    // Convert local event time
    // to UTC
    // =========================

    const startDateTime = DateTime.fromISO(`${startDate}T${startTime}`, {
      zone: timezone,
    });

    const endDateTime = DateTime.fromISO(`${endDate}T${endTime}`, {
      zone: timezone,
    });

    if (!startDateTime.isValid || !endDateTime.isValid) {
      return errorResponse("Invalid event date or time.", 400);
    }

    // End must be after Start
    if (endDateTime <= startDateTime) {
      return errorResponse("End date/time must be after start date/time.", 400);
    }

    // Convert to UTC for database storage
    const startAt = startDateTime.toUTC().toISO();
    const endAt = endDateTime.toUTC().toISO();

    if (!startAt || !endAt) {
      return errorResponse("Failed to convert event time to UTC.", 400);
    }

    const claimEndAt = DateTime.fromISO(endAt).plus({ hours: 1 }).toISO();

    if (!claimEndAt) {
      return errorResponse("Failed to calculate claim end time.", 400);
    }

    // =========================
    // Participants validation
    // =========================

    if (!maxParticipants || Number(maxParticipants) <= 0) {
      return errorResponse("Participants must be greater than 0.", 400);
    }

    // =========================
    // Points validation
    // =========================

    if (
      points === undefined ||
      points === null ||
      points === "" ||
      Number(points) < 0
    ) {
      return errorResponse("Points must be 0 or greater.", 400);
    }

    // =========================
    // Get issuer
    // =========================

    const { issuer, issuerError } = await getIssuerByWallet(wallet);

    if (issuerError) {
      return errorResponse(issuerError.message, 500);
    }

    if (!issuer) {
      return errorResponse("Issuer not found. Please register first.", 404);
    }

    // =========================
    // Make sure event belongs
    // to connected issuer
    // =========================

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

    // =========================
    // Make sure achievement
    // belongs to issuer
    // =========================

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

    // =========================
    // Update event
    // =========================

    const { data, error } = await supabaseServer
      .from("events")
      .update({
        achievement_id: achievementId,

        title: title.trim(),

        description: description?.trim() || null,

        image: image || null,

        event_type: eventType,

        location: location.trim(),

        start_at: startAt,
        end_at: endAt,

        timezone,

        max_participants: Number(maxParticipants),

        points: Number(points),

        claim_end_at: claimEndAt,
      })
      .eq("id", id)
      .eq("issuer_id", issuer.id)
      .select(
        `
          *,
          achievement:achievements (
            id,
            title,
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
