import { createHash } from "crypto";

import { errorResponse, successResponse } from "@/lib/api/response";
import { convertEventTimeToUTC } from "@/lib/event/convertEventTime";
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
      startTime,
      endDate,
      endTime,
      timezone,
      maxParticipants,
      points,
      image,
      participationKeyword,
    } = body;

    const wallet = rawWallet?.toLowerCase();

    if (!wallet) {
      return errorResponse("Wallet is required.", 400);
    }

    if (!achievementId) {
      return errorResponse("Achievement is required.", 400);
    }

    if (!title?.trim()) {
      return errorResponse("Event title is required.", 400);
    }

    if (!participationKeyword?.trim()) {
      return errorResponse("Participation keyword is required.", 400);
    }

    if (!startDate || !startTime) {
      return errorResponse("Start date and time are required.", 400);
    }

    if (!endDate || !endTime) {
      return errorResponse("End date and time are required.", 400);
    }

    if (!timezone) {
      return errorResponse("Timezone is required.", 400);
    }

    const startAt = convertEventTimeToUTC(startDate, startTime, timezone);

    const endAt = convertEventTimeToUTC(endDate, endTime, timezone);

    if (!startAt || !endAt) {
      return errorResponse("Invalid event date/time.", 400);
    }

    if (new Date(endAt) <= new Date(startAt)) {
      return errorResponse(
        "End date and time must be after start date and time.",
        400,
      );
    }

    /**
     * Claim window ends 1 hour after the event ends.
     */
    const claimEndAt = new Date(
      new Date(endAt).getTime() + 60 * 60 * 1000,
    ).toISOString();

    /**
     * Hash the participation keyword before storing it.
     *
     * The original keyword is never stored in the database.
     */
    const participationKeywordHash = createHash("sha256")
      .update(participationKeyword.trim())
      .digest("hex");

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
        title: title.trim(),
        description,
        location,
        event_type: eventType,

        start_at: startAt,
        end_at: endAt,
        timezone,

        max_participants: maxParticipants ? Number(maxParticipants) : null,

        points: points ? Number(points) : null,

        image: image || null,

        participation_keyword_hash: participationKeywordHash,

        claim_end_at: claimEndAt,
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
