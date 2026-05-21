import Link from "next/link"

export default function Register() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-blue-400 rounded text-white p-5 w-100">
                <h1 className="font-bold text-2xl">Miniso</h1>
                <h3 className="mb-3">Note Taking made easier!</h3>
                <input type="text" placeholder="Name" className="p-2 bg-white rounded text-gray-500 w-full mb-2" />
                <input type="text" placeholder="Email" className="p-2 bg-white rounded text-gray-500 w-full mb-2" />
                <input type="text" placeholder="Password" className="p-2 bg-white rounded text-gray-500 w-full mb-2" />
                <div className="flex justify-between items-center">
                    <button className="bg-blue-700 text-white rounded p-2">Register</button>
                    <p>Already a User? Click here to <Link href={'/login'} className="text-blue-700">Login</Link></p>
                </div>
            </div>
        </div>
    )
}