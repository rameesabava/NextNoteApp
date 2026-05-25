"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FaClock, FaEdit, FaStickyNote, FaUser } from "react-icons/fa";
import { IoIosPower } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function Dashboard() {
    const {data:session} = useSession()
    if(!session){
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
                    <IoIosPower className="ms-3"/>
                </div>
            </div>
            <div className="bg-gray-300 p-3 my-5 w-200 rounded">
                <h1 className="text-blue-600 my-3 text-2xl">My Notes</h1>
                <div className="flex gap-5">
                    <div className="bg-yellow-200 rounded p-3 w-50">
                        <div className="flex justify-between items-center text-gray-600"><h1>title</h1><FaEdit /></div>
                        <p className="my-3">description</p>
                        <div className="flex justify-between items-center text-gray-600">
                            <div className="flex items-center gap-2"><FaClock />23/5/26</div>
                            <div className="text-red-600"><MdDelete className="text-xl" /></div>
                        </div>
                    </div>
                    <div className="w-50 rounded border border-dashed flex justify-center items-center text-center">
                        <div>
                            <div className="flex justify-center items-center"><FaEdit /></div>
                            <p>New Note</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}