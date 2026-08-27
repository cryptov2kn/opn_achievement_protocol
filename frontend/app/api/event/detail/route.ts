import { errorResponse, successResponse } from "@/lib/api/response";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return errorResponse("Event id is required.", 400);
    }

    const { data, error } = await supabaseServer
      .from("events")
      .select(
        `
        *,
        achievement:achievements(
          id,
          title,
          category,
          difficulty
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data);
  } catch (err) {
    console.error(err);

    return errorResponse("Internal server error.", 500);
  }
}
