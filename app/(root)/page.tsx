"use client"

import { UserData } from "@/lib/actions/auth.actions"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>()

  useEffect(() => {
    const dataJSON = localStorage.getItem("userData")
    if (dataJSON === null) {
      return router.push("/auth/sign-in")
    } else {
      const data: UserData = JSON.parse(dataJSON)
      setUserData(data)
    }
  }, [])

  return (
    <>
    </>
  )
}
