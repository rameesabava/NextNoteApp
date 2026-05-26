"use client"
import { FaX } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



export default function AddNote() {
    const {data:session, status} = useSession()
    console.log(session);
    
    const [noteDetails, setNoteDetails] = useState({
        title:"", description:"", color:"", userMail:session?.user?.email
    })    
    console.log(noteDetails);
    
    if(status=="loading"){
        return <p className="text-center mt-10 text-2xl">Loading....</p>
    }
    if(status=="unauthenticated"){
        redirect('/login')
    }

    const resetAddNoteForm = ()=>{
        setNoteDetails({title:"", description:"", color:"", userMail:session?.user?.email})
    }

    const handleAddNote = async ()=>{
       const  userMail = session?.user?.email
        const {title, description,color} = noteDetails
        if(!title || !description || !color || !userMail){
            toast.error("Please fill the form compltely!!!")
        }else{
            const res = await fetch('/api/notes',{
                method:"POST",
                body:JSON.stringify(noteDetails)
                
            })
            if(res.status==201){
                toast.success("Note added successfully")
                resetAddNoteForm ()
            }
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="border-gray-100 shadow rounded p-5 w-100">
                <h1 className="text-blue-500 font-bold text-2xl">Miniso</h1>
                <h2 className="text-gray-500">Add Notes</h2>
                <div className="flex justify-between items-center my-3">
                    <div>
                        <FaX onClick={resetAddNoteForm} />
                    </div>
                    <button onClick={handleAddNote} className="p-1 bg-red-400 text-white rounded-xl">
                        <div className="flex items-center">Save<TiTick className="text-xl" /></div>
                    </button>

                </div>
                <div className="flex justify-between items-center"><h5 className="text-gray-400">Theme</h5>
                    <div onClick={()=>setNoteDetails({...noteDetails,color:"yellow"})} className={noteDetails.color=="yellow"?"rounded-full w-6 h-6 border bg-yellow-300":"rounded-full w-6 h-6 bg-yellow-300"}></div>
                    <div onClick={()=>setNoteDetails({...noteDetails,color:"red"})} className={noteDetails.color=="red"?"rounded-full w-6 h-6 border bg-red-300":"rounded-full w-6 h-6 bg-red-300"}></div>
                    <div onClick={()=>setNoteDetails({...noteDetails,color:"green"})} className={noteDetails.color=="green"?"rounded-full w-6 h-6 border bg-green-300":"rounded-full w-6 h-6 bg-green-300"}></div>
                    <div onClick={()=>setNoteDetails({...noteDetails,color:"blue"})} className={noteDetails.color=="blue"?"rounded-full w-6 h-6 border bg-blue-300":"rounded-full w-6 h-6 bg-blue-300"}></div>

                </div>
                <div className="my-5">
                    <input value={noteDetails.title} onChange={e=>setNoteDetails({...noteDetails, title:e.target.value})} type="text" placeholder="Title" className="w-full p-2 mb-2" />
                    <input value={noteDetails.description} onChange={e=>setNoteDetails({...noteDetails, description:e.target.value})} type="text" placeholder="Description" className="w-full p-2" />
                </div>            </div>
        </div>
    )
}