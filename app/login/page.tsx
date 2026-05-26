"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Login() {
    const [userDetails, setUserDetails] = useState({
        email: "", password: ""
    })

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const { email, password } = userDetails
        if (!email || !password) {
            toast.error("Please fill the form completely!!!")
        } else {
            const res = await signIn("credentials", {
                email, password, redirect: false
            })
            if (res?.ok) {
                toast.success("Login Successfull..")
                window.location.href = "/notes"

            } else {
                toast.error("Invalid Credentials!!!")
                setUserDetails({ email: "", password: "" })
            }
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-blue-400 rounded text-white p-5 w-100">
                <h1 className="font-bold text-2xl">Miniso</h1>
                <h3 className="mb-3">Note Taking made easier!</h3>
                <form onSubmit={handleLogin}>
                    <input value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder="Email" className="p-2 bg-white rounded text-gray-500 w-full mb-2" />
                    <input value={userDetails.password} onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder="Password" className="p-2 bg-white rounded text-gray-500 w-full mb-2" />
                    <div className="flex justify-between items-center">
                        <button type="submit" className="bg-blue-700 text-white rounded p-2">Login</button>
                        <p>Already a User? Click here to <Link href={'/register'} className="text-blue-700">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}