import { NextResponse } from "next/server";

/**
 * Success response
 */
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status,
    },
  );
}

/**
 * Error response
 */
export function errorResponse(error: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    {
      status,
    },
  );
}
