"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Register() {

    const router = useRouter()
    const [userDetails, setUserDetails] = useState({
        name:"",email:"",password:""
    })

    const handleRegister = async (e:any)=>{
        e.preventDefault()
        const {name, email,password} = userDetails
        if(!name || !email || !password){
            toast.error("Please Fill the Form Completely!!!")
        }else{
            const res = await fetch('/api/register',{
                method:"POST",
                body:JSON.stringify(userDetails)
            })
            // console.log(res)
            const serverResponse = await res.json()
                console.log(serverResponse);
            if(res.status==201){
                toast.success(serverResponse.message)
               setTimeout(()=>{
                 router.push('/login')
               },2000)
            }else{
                toast.error(serverResponse.message)
            }
            setUserDetails({name:"",email:"",password:""})
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-blue-400 rounded text-white p-5 w-100">
                <h1 className="font-bold text-2xl">Miniso</h1>
                <h3 className="mb-3">Note Taking made easier!</h3>
                <form onSubmit={handleRegister}>
                    <input onChange={e=>setUserDetails({...userDetails,name:e.target.value})} type="text" placeholder="Name" className="p-2 bg-white rounded text-gray-500 w-full mb-2" />
                    <input onChange={e=>setUserDetails({...userDetails,email:e.target.value})}  type="text" placeholder="Email" className="p-2 bg-white rounded text-gray-500 w-full mb-2" />
                    <input onChange={e=>setUserDetails({...userDetails,password:e.target.value})}  type="text" placeholder="Password" className="p-2 bg-white rounded text-gray-500 w-full mb-2" />
                
                <div className="flex justify-between items-center">
                    <button type="submit" className="bg-blue-700 text-white rounded p-2">Register</button>
                    
                    <p>Already a User? Click here to <Link href={'/login'} className="text-blue-700">Login</Link></p>
                    
                </div>
                </form>
            </div>
            
        </div>
    )
}