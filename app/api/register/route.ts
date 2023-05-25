import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, password } = body

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await db.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
