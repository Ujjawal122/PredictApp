import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "@/helpers/generateCode";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, role,phone } = await request.json();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const normalizeRole = role?.toLowerCase();

    // Generate verification code
    const verifyCode = generateVerificationCode();
    const verifyCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: normalizeRole,
      phone,
      verifyCode,
      verifyCodeExpiry,
      isVerified: false,
    });

    await newUser.save();

    // Send email
    await sendVerificationEmail(email, name, verifyCode);

    return NextResponse.json(
      {
        message: "User registered successfully. Please verify your email.",
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
