import { connectDB } from "@/lib/mongodb";
import notes from "@/models/noteModel"
import { NextRequest, NextResponse } from "next/server";


// POST : add notes
export async function POST(req:NextRequest) {
    try{
        await connectDB()
        const body = await req.json()
        const newNote = await notes.create(body)
        return NextResponse.json(newNote, {status:201})
    }catch(err){
        console.log(err);
        return NextResponse.json("Something went wrong",{status:500})
        
    }
    
}

// GET : get all notes
export async function GET(req:NextRequest) {
    try{
        await connectDB()
        const allNotes = await notes.find()
        return NextResponse.json(allNotes, {status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json("Something went wrong",{status:500})
        
    }
    
}