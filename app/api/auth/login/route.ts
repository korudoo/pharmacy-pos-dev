import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"


const users = [
  {
    id: "1",
    email: "pietro.schirano@gmail.com",
    passwordHash: "$2b$10$WqhNm.HzajC67PkpLTRWFuHdF9TRNBECA80XiccJbG/DZIZ2lql3K", // password123
    name: "Pietro Schirano",
    role: "admin",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const email = body?.email
    const password = body?.password

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const bcrypt = (await import("bcryptjs")).default
  

    const passwordValid = await bcrypt.compare(password, user.passwordHash)
    console.log("passwordValid:", passwordValid)


    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}
