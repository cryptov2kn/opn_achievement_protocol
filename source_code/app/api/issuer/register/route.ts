import { errorResponse, successResponse } from "@/lib/api/response";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const wallet = body.wallet.toLowerCase();

    // Check if this wallet has already registered an issuer
    const { data: existingIssuer, error: existingError } = await supabaseServer
      .from("issuers")
      .select("id")
      .eq("wallet", wallet)
      .maybeSingle();

    if (existingError) {
      return errorResponse(existingError.message, 500);
    }

    if (existingIssuer) {
      return errorResponse("Wallet already registered.", 409);
    }

    // Create new issuer
    const { data, error } = await supabaseServer
      .from("issuers")
      .insert({
        wallet,
        name: body.name,
        organization_type: body.organizationType,
        category: body.category,
        website: body.website,
        twitter: body.twitter,
        description: body.description,
        country: body.country,
        founded_year: body.foundedYear ? Number(body.foundedYear) : null,
        logo: body.logo,
      })
      .select()
      .single();

    if (error) {
      return errorResponse(error.message, 400);
    }

    return successResponse(data, 201);
  } catch (err) {
    console.error(err);

    return errorResponse("Internal server error.", 500);
  }
}
