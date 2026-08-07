import { errorResponse, successResponse } from "@/lib/api/response";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Get achievement by id.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    // Validate id
    if (!id) {
      return errorResponse("Achievement id is required.", 400);
    }

    // Get achievement
    const { data, error } = await supabaseServer
      .from("achievements")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return errorResponse(error.message, 404);
    }

    return successResponse(data);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}
