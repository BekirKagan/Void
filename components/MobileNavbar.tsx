"use client"

import Link from "next/link"

export default function MobileNavBar() {
  return (
    <div className="absolute bottom-0 md:hidden w-full h-16 flex bg-neutral-900 border-t-2 border-blue-chill-500">
      <Link className="flex-1 flex justify-center items-center" href="/">Home</Link>
      <Link className="flex-1 flex justify-center items-center" href="/">Upload</Link>
      <Link className="flex-1 flex justify-center items-center" href="/profile">
        <img className="w-10 h-10 rounded-full object-cover" src="profile_photo.jpg" alt=""></img>
      </Link>
    </div>
  )
}
