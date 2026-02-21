"use client";

import { IoNotificationsSharp } from "react-icons/io5";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full min-h-screen flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium">Hello, Admin</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-9 h-9 rounded-full flex items-center justify-center">
              <IoNotificationsSharp size={30} />
              <div className="w-2 h-2 rounded-full bg-red-600 absolute top-0 left-6"></div>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-600 text-white">M</div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex h-28 items-center justify-center bg-lime-300">
            <p>Card one</p>
          </div>
          <div className="flex h-28 items-center justify-center bg-amber-400">
            <p>Card two</p>
          </div>
          <div className="flex h-28 items-center justify-center bg-blue-400">
            <p>Card three</p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex min-h-172 items-center justify-center bg-lime-100">
            <p>Card one</p>
          </div>
          <div className="flex min-h-172 items-center justify-center bg-amber-100">
            <p>Card two</p>
          </div>
          <div className="flex min-h-172 items-center justify-center bg-blue-100">
            <p>Card three</p>
          </div>
        </div>
      </main>
    </div>
  );
}
