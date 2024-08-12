"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UserData } from "@/lib/actions/auth.actions"

export default function Profile() {
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
    <>
      {/* For mobile screens */}
      <div className="md:hidden w-full h-full flex flex-col">
        <div className="w-full h-1/3 flex flex-col p-3 space-y-0 justify-center items-center border-b-2 border-b-blue-chill-500">
          <img className="w-20 h-20 rounded-full object-cover" src={userData?.photo} alt=""></img>
          <h1 className="text-2xl font-semibold">{userData?.username}</h1>
          <h2 className="text-neutral-400">{userData?.email}</h2>
          <button className="absolute right-2 top-14 w-12 bg-blue-chill-500">Edit</button>
        </div>
        <div className="w-full h-2/3 flex flex-col p-1">
          <div className="w-full h-10 flex items-center space-x-2 p-1">
            <button className="h-full px-2 bg-blue-chill-500">Videos</button>
            <button className="h-full px-2 bg-blue-chill-500">Playlists</button>
            <button className="h-full px-2 bg-blue-chill-500">Liked</button>
          </div>
          <div className="w-full h-full flex">
          </div>
        </div>
      </div>
      {/* For desktop screens */}
      <div className="hidden md:flex w-full h-full">
        <div className="w-full h-1/2 flex items-center p-8 space-x-8 border-b-2 border-b-blue-chill-500">
          <img className="w-60 h-60 rounded-full object-cover" src={userData?.photo} alt=""></img>
          <div className="w-96 h-full pt-8 flex flex-col">
            <h1 className="text-3xl font-bold">{userData?.username}</h1>
            <h2 className="pb-2">{userData?.email}</h2>
            <p className="text-sm text-wrap pb-4 text-neutral-400">{userData?.bio}</p>
            <button className="w-14 bg-blue-chill-500">Edit</button>
          </div>
        </div>
      </div>
    </>
  )
}
