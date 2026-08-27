import { errorResponse, successResponse } from "@/lib/api/response";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return errorResponse("Credential ID is required.", 400);
    }

    const { data, error } = await supabaseServer
      .from("credentials")
      .select(
        `
      *,
      achievement:achievements (
        id,
        title,
        category,
        difficulty
      ),
      event:events (
        id,
        title,
        image
      )
    `,
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      return errorResponse("Credential not found.", 404);
    }

    return successResponse(data);
  } catch (error) {
    console.error(error);

    return errorResponse("Internal server error.", 500);
  }
}
