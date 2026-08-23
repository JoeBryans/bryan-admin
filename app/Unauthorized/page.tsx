// import Login from '@/app/components/Login'

import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <main className="w-full h-screen place-content-center ">
        <div className="shadow-sm p-5 w-sm mx-auto rounded-lg shrink-0 drop-shadow-md bg-white">
            <h1>401 - Unauthorized</h1>
            <p>This page is only accessible by Admins</p>
            {/* <p>Please You are not an Admin</p> */}
            <p> Please <Link href="/auth/sign-in"
             className="text-indigo-700"
            >Sign In</Link> to continue</p>
            
            
        </div>
        </main>
    )
}