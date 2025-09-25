import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Water from "@/models/WaterTest";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { location, reporter, phLevel, turbidity, contamination, notes } =
      await request.json();

    // ✅ Validate required fields
    if (!location || phLevel === undefined || turbidity === undefined) {
      return NextResponse.json(
        { error: "Location, pH level, and turbidity are required" },
        { status: 400 }
      );
    }

    // ✅ Convert strings to numbers
    const phNum = Number(phLevel);
    const turbNum = Number(turbidity);

    if (isNaN(phNum) || isNaN(turbNum)) {
      return NextResponse.json(
        { error: "pH level and turbidity must be valid numbers" },
        { status: 400 }
      );
    }

    // ✅ Validate contamination enum
    const validContamination = ["none", "mild", "severe"];
    const contaminationVal = validContamination.includes(contamination)
      ? contamination
      : "none";

    const newWaterReport = new Water({
      location,
      reporter,
      phLevel: phNum,
      turbidity: turbNum,
      contamination: contaminationVal,
      notes,
    });

    await newWaterReport.save();

    return NextResponse.json(
      {
        message: "Water report submitted successfully",
        waterId: newWaterReport._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Water report error:", error.message, error.stack);

    // Send detailed error only for development; in production you can simplify this
    return NextResponse.json(
      {
        error:
          error.name === "ValidationError"
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// GET handler stays the same
export async function GET() {
  try {
    await connectDB();
    const waterReports = await Water.find().sort({ createdAt: -1 });

    const transformed = waterReports.map(w => {
      const issue: string[] = [];

      if (w.phLevel < 6.5 || w.phLevel > 8.5) issue.push("pH level abnormal");
      if (w.turbidity > 5) issue.push("High turbidity");
      if (w.contamination && w.contamination !== "none") issue.push(`${w.contamination} contamination`);

      return {
        ...w.toObject(),
        issue
      };
    });

    return NextResponse.json({ reports: transformed }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch water reports error:", error.message, error.stack);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}