"use client"

import Link from "next/link"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { authenticateUser } from "@/lib/actions/auth.actions"

export default function SignIn() {
  const router = useRouter()

  const getFormEntries = (target: HTMLFormElement) => {
    const data = new FormData(target)
    const entries = Object.fromEntries(data)
    return entries
  }

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const { email, password } = getFormEntries(form)
    const userData = await authenticateUser(email.toString(), password.toString())
    if (userData) {
      toast.success("Signed in successfully!")
      localStorage.setItem("userID", userData.id)
      router.push("/")
    } else {
      toast.error("Something went wrong. Please try again later.")
    }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col space-y-2 text-center items-center p-4">
        <h2 className="text-2xl">Sign In to VOID</h2>
        <form className="w-full flex flex-col items-center space-y-4 py-4" onSubmit={handleSignIn}>
          <input
            className="w-60 md:w-72 h-12 rounded-sm bg-neutral-800 outline-none px-4 placeholder:text-neutral-400"
            type="email"
            placeholder="E-Mail"
            name="email">
          </input>
          <input
            className="w-60 md:w-72 h-12 rounded-sm bg-neutral-800 outline-none px-4 placeholder:text-neutral-400"
            type="password"
            placeholder="Password"
            name="password">
          </input>
          <button className="w-56 md:w-64 h-12 bg-blue-chill-500" type="submit">Sign In</button>
        </form>
        <p className="absolute left-4 bottom-4">
          Don't have an account? <Link className="text-blue-chill-300" href="/auth/sign-up">Sign Up</Link>
        </p>
      </div>
    </>
  )
}

