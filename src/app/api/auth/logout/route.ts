import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    try {
        const response=NextResponse.json({
            message:"Logout Successfully"
        },{status:200})
        response.cookies.set("token"," ",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            expires:new Date(0),
            path:"/"
        })
        return response;

    } catch (error:any) {
        console.log("logout error",error.message);
        return NextResponse.json({
            error:"Logout failed"
        },{status:500})
        
        
    }
    
}