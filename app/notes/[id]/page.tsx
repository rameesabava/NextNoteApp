"use client"
import { FaX } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UpdateNote() {
    const {status} = useSession()
    if(status=="loading"){
        return <p className="text-center mt-10 text-2xl">Loading....</p>
    }
    if(status=="unauthenticated"){
        redirect('/login')
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="border-gray-100 shadow rounded p-5 w-100">
                <h1 className="text-blue-500 font-bold text-2xl">Miniso</h1>
                <h2 className="text-gray-500">Edit Notes</h2>
                <div className="flex justify-between items-center my-3">
                    <div>
                        <FaX />
                    </div>
                    <button className="p-1 bg-red-400 text-white rounded-xl">
                        <div className="flex items-center">Update<TiTick className="text-xl" /></div>
                    </button>

                </div>
                <div className="flex justify-between items-center"><h5 className="text-gray-400">Theme</h5>
                    <button className="rounded-full w-6 h-6 bg-yellow-300"></button>
                    <button className="rounded-full w-6 h-6 bg-red-300"></button>
                    <button className="rounded-full w-6 h-6 bg-green-300"></button>
                    <button className="rounded-full w-6 h-6 bg-blue-300"></button>

                </div>
                <div className="my-5">
                    <input type="text" placeholder="Title" className="w-full p-2 mb-2" />
                    <input type="text" placeholder="Description" className="w-full p-2" />
                </div>
            </div>
        </div>
    )
}