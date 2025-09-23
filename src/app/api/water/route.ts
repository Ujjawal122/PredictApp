import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Water from "@/models/WaterTest";

export async function POST(request:NextRequest) {
    try {
        await connectDB()
        const {location,reporter,phLevel,turbidity,contamination,notes}=await request.json()

         if (!location || phLevel === undefined || turbidity === undefined) {
      return NextResponse.json(
        { error: "Location, pH level, and turbidity are required" },
        { status: 400 }
      );
    }

      const newWaterReport = new Water({
      location,
      reporter,
      phLevel,
      turbidity,
      contamination,
      notes,
    });

    await newWaterReport.save();

    return NextResponse.json(
      { message: "Water report submitted successfully", waterId: newWaterReport._id },
      { status: 201 }
    );

    } catch (error:any) {
         console.error("Water report error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
    }

export async function GET() {
    try {
            await connectDB();
    const waterReports = await Water.find().sort({ createdAt: -1 });
    return NextResponse.json({ waterReports }, { status: 200 });
    } catch (error:any) {
      console.error("Fetch water reports error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );   
    }
}