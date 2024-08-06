"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)

  function toggleProfileMenu() {
    setShowProfileMenu(showProfileMenu => !showProfileMenu)
  }

  function profileMenu(): JSX.Element | null {
    if (!showProfileMenu) {
      return null
    }

    return (
      <div className="absolute top-14 right-2 w-40 flex flex-col items-center p-2 space-y-2 bg-neutral-700">
        <Link className="w-36 h-8 bg-neutral-500 flex justify-center items-center" href="/profile" onClick={toggleProfileMenu}>username</Link>
        <button className="w-36 h-8 bg-neutral-500">Sign Out</button>
      </div>
    )
  }

  return (
    <>
      <nav className="w-full h-12 flex justify-center items-center bg-neutral-900">
        <Link className="absolute left-2 text-2xl font-bold" href="/">VOID</Link>
        <input className="w-60 md:w-96 h-7 rounded-md bg-neutral-700 text-center text-sm outline-none placeholder:text-neutral-400" type="text" placeholder="Search"></input>
        <button className="hidden md:flex absolute right-2" onClick={toggleProfileMenu}>
          <img className="w-8 h-8 rounded-full object-cover" src="profile_photo.jpg" alt=""></img>
        </button>
        {profileMenu()}
      </nav>
    </>
  )
}
