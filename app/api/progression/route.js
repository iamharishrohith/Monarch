import { NextResponse } from "next/server";
import { getProgressionSnapshot } from "@/lib/queries";

export async function GET() {
  const snapshot = await getProgressionSnapshot();

  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}
