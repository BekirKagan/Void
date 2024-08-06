"use client"

import Link from "next/link"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { createUser } from "@/lib/actions/auth.actions"

export default function SignUp() {
  const router = useRouter()

  const getFormEntries = (target: HTMLFormElement) => {
    const data = new FormData(target)
    const entries = Object.fromEntries(data)
    return entries
  }

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const { username, email, password } = getFormEntries(form)
    const response = JSON.parse(await createUser(username.toString(), email.toString(), password.toString()))
    if (!response.success) {
      toast.error(response.message)
    } else {
      toast.success(response.message)
      router.push("/")
    }
  }

  return (
    <>
      <div className="w-full h-full flex flex-col space-y-2 text-center items-center p-4">
        <h2 className="text-md">Become a Star</h2>
        <h2 className="text-2xl">Sign Up to VOID</h2>
        <form className="w-full flex flex-col items-center space-y-4 py-4" onSubmit={handleSignUp}>
          <input
            className="w-60 md:w-72 h-12 rounded-sm bg-neutral-800 outline-none px-4 placeholder:text-neutral-400"
            type="text"
            placeholder="Username"
            name="username">
          </input>
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
          <button
            className="w-56 md:w-64 h-12 bg-blue-chill-500"
            type="submit"
          >Sign Up
          </button>
        </form>
        <p className="absolute left-4 bottom-4">
          Have an account? <Link className="text-blue-chill-300" href="/auth/sign-in">Sign In</Link>
        </p>
      </div>
    </>
  )
}
