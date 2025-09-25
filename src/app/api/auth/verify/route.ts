import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, code } = await req.json();
    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (user.isVerified)
      return NextResponse.json({ message: "User already verified" }, { status: 200 });

    if (user.verifyCode !== code)
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });

    if (user.verifyCodeExpiry < new Date())
      return NextResponse.json({ error: "Verification code expired" }, { status: 400 });

    user.isVerified = true;
    user.verifyCode = undefined;
    user.verifyCodeExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "User verified successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("Verification error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
