"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UserData } from "@/lib/actions/auth.actions"

export default function MobileNavBar() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>()

  useEffect(() => {
    const dataJSON = localStorage.getItem("userData")
    if (!dataJSON) {
      return router.push("/auth/sign-in")
    } else {
      const data: UserData = JSON.parse(dataJSON)
      setUserData(data)
    }
  }, [])
  return (
    <div className="absolute bottom-0 md:hidden w-full h-16 flex bg-neutral-900 border-t-2 border-blue-chill-500">
      <Link className="flex-1 flex justify-center items-center" href="/">Home</Link>
      <Link className="flex-1 flex justify-center items-center" href="/upload">Upload</Link>
      <Link className="flex-1 flex justify-center items-center" href="/profile">
        <img className="w-10 h-10 rounded-full object-cover" src={userData?.photo} alt=""></img>
      </Link>
    </div>
  )
}
