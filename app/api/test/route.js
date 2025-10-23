import { connectDB } from "@/lib/dbConnection.js";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  return NextResponse.json({
    success: true,
    message: "db Connected Successfully!",
  });
}