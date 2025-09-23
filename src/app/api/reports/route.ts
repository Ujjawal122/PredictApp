import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Report from "@/models/Report";


export async function  POST(request:NextRequest) {
    try {
        await connectDB()
        const {reporter,phone,location,symptoms,notes}=await request.json()
        if(!reporter||!location||!symptoms){
            return NextResponse.json(
        { error: "Reporter, location, and symptoms are required" },
        { status: 400 }
      );
        }

        const newReport=new Report({
            reporter,
            phone,
            location,
            symptoms,
            notes
        })

        await newReport.save()
        return NextResponse.json({
            message:"Report submitted successfully",reportId:newReport._id
        },{status:201})

    } catch (error:any) {
         return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
    }
    
}


export async function GET() {
  try {
    await connectDB();
    const reports = await Report.find().sort({ createdAt: -1 }); // get all reports
    return NextResponse.json({ reports }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch reports error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
