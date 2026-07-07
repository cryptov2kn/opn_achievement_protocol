import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabaseServer
      .from("issuers")
      .upsert(
        [
          {
            wallet: body.wallet,
            name: body.name,
            organization_type: body.organizationType,
            category: body.category,
            website: body.website,
            twitter: body.twitter,
            description: body.description,
            country: body.country,
            founded_year: body.foundedYear,
            logo: body.logo,
          },
        ],
        {
          onConflict: "wallet",
        },
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
