import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const SECRET = process.env.JWT_SECRET || "mysecret";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET) as { id: string; email: string };

    return NextResponse.json({
      loggedIn: true,
      user: { id: decoded.id, email: decoded.email },
    });
  } catch (err) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
