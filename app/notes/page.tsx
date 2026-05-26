"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaClock, FaEdit, FaStickyNote, FaUser } from "react-icons/fa";
import { IoIosPower } from "react-icons/io";
import { MdDelete } from "react-icons/md";


interface Note {
    _id: string;
    title: string;
    description: string;
    color: string;
    userMail: string;
    createdAt: string;
}
export default function Dashboard() {
    const { data: session, status } = useSession()
    const [allNotes, setAllNotes] = useState<Note[]>([])

    console.log(allNotes);

    useEffect(() => {
        fetchAllNotes()
    }, [])

    const fetchAllNotes = async () => {
        const res = await fetch('/api/notes')
        const serverResponse = await res.json()
        setAllNotes(serverResponse)
    }
    if (status == "loading") {
        return <p className="text-center mt-10 text-2xl">Loading....</p>
    }
    if (status == "unauthenticated") {
        redirect('/login')
    }
    return (
        <div className="flex flex-col justify-center items-center my-5">
            <div className="flex justify-between items-center text-blue-400 w-200">
                <div className="flex items-center gap-2">
                    <FaStickyNote />
                    <h1>Miniso</h1>
                </div>
                <div className="flex items-center gap-2">
                    <FaUser />{session?.user?.name}
                    <IoIosPower onClick={() => signOut()} />
                </div>
            </div>
            <div className="bg-gray-300 p-3 my-5 w-200 rounded">
                <h1 className="text-blue-600 my-3 text-2xl">My Notes</h1>
                <div className="flex gap-5">
                    {
                        allNotes.length>0 &&
                        allNotes?.map(note=>(
                            <div key={note?._id} className="bg-yellow-200 rounded p-3 w-75">
                        <div className="flex justify-between items-center text-gray-600"><h1>{note?.title}</h1><Link href={`notes/${note?._id}`}><FaEdit/></Link></div>
                        <p className="my-3">{note?.description}</p>
                        <div className="flex justify-between items-center text-gray-600">
                            <div className="flex items-center gap-2 text-xs"><FaClock />{note?.createdAt}</div>
                            <div className="text-red-600"><MdDelete className="text-xl" /></div>
                        </div>
                    </div>
                        ))
                    }
                    <div className="w-75 rounded border border-dashed flex justify-center items-center text-center">
                        <Link href={'/notes/add'}>
                            <div className="flex justify-center items-center"><FaEdit /></div>
                            <p>New Note</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}