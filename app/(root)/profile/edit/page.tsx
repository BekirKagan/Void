"use client"

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { updateUser, getUser, UserData } from "@/lib/actions/auth.actions"

export default function Profile() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>()

  useEffect(() => {
    getUserData()
  }, [])

  async function getUserData() {
    const userID = localStorage.getItem("userID")
    if (!userID) {
      return router.push("/auth/sign-in")
    } else {
      const userData = await getUser(userID)
      if (!userData) {
        return router.push("/auth/sign-in")
      } else {
        setUserData(userData)
      }
    }
  }

  const getFormEntries = (target: HTMLFormElement) => {
    const data = new FormData(target)
    const entries = Object.fromEntries(data)
    return entries
  }

  async function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const { username, bio } = getFormEntries(form)
    if (userData) {
      const newUserData: UserData = userData
      newUserData.username = username !== "" ? username.toString() : newUserData.username
      newUserData.bio = bio !== "" ? bio.toString() : newUserData.bio
      newUserData.photo = "/default_profile_photo.svg"
      const success = await updateUser(newUserData)
      if (success) {
        localStorage.setItem("userData", JSON.stringify(newUserData))
      }
      return router.push("/profile")
    }
  }

  return (
    <>
      {/* For mobile screens */}
      <div className="md:hidden w-full h-full flex flex-col">
        <form className="w-full h-1/3 flex flex-col p-3 space-y-2 justify-center items-center border-b-2 border-b-blue-chill-500">
          <img className="w-20 h-20 rounded-full object-cover cursor-pointer border-2 border-blue-chill-500" src={userData?.photo} alt="" onClick={() => console.log("Change photo")}></img>
          <input
            className="text-xl font-semibold p-1 text-center rounded-md bg-neutral-700 outline-none placeholder:text-neutral-400"
            type="text"
            placeholder={userData?.username}
            name="username">
          </input>
          <h2 className="text-neutral-400">{userData?.email}</h2>
          <button className="absolute right-2 top-14 w-12 bg-blue-chill-500">Save</button>
        </form>
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
          <img className="w-60 h-60 rounded-full object-cover cursor-pointer border-2 border-blue-chill-500" src={userData?.photo} alt="" onClick={() => console.log("Change photo")}></img>
          <form className="w-96 h-full pt-8 space-y-2 flex flex-col" onSubmit={handleEdit}>
            <input
              className="text-3xl font-bold p-1 rounded-md bg-neutral-700 outline-none placeholder:text-neutral-400"
              type="text"
              placeholder={userData?.username}
              name="username">
            </input>
            <h2 className="">{userData?.email}</h2>
            <textarea
              className="text-sm text-wrap p-1 rounded-md bg-neutral-700 outline-none resize-none placeholder:text-neutral-400"
              placeholder={userData?.bio}
              name="bio"
              maxLength={141} rows={3} cols={47}>
            </textarea>
            <button className="w-14 bg-blue-chill-500" type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  )
}
