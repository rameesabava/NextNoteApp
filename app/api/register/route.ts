import users from "@/models/userModel"
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

// register controller function: POST
export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const {name,email,password} = await req.json()
        const existingUser = await users.findOne({email})
        if(existingUser){
            return NextResponse.json({message:"User Already exists!!!Please Login...."}, { status: 409 })
        }else{
            const encryptPassword = await bcrypt.hash(password,10)
            const newUser = await users.create({
                name,email,password:encryptPassword
            })
            return NextResponse.json({message:"User Registered Successfully",data:newUser}, { status: 201 })
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({message:"Something went wrong!!!"}, { status: 500 })
    }
}