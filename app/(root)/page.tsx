"use client"

import { getUser, UserData } from "@/lib/actions/auth.actions"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
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

  return (
    <>
    </>
  )
}
