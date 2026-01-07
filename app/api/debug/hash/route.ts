import { NextResponse } from "next/server"

export async function GET() {
  const bcrypt = (await import("bcryptjs")).default
  const hash = await bcrypt.hash("password123", 10)

  return NextResponse.json({ hash })
}
