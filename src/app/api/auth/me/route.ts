import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromUser";
import {connectDB }from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId).select("-password");
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
