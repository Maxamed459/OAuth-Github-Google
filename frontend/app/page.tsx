"use client";

import { FaGoogle } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="w-full min-h-screen flex flex-col items-center justify-center space-y-10">
        <h1 className="text-5xl font-bold">Third Part Authentications</h1>
        <div className="flex space-x-8">
          <button
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:4001/auth/github";
            }}
            className="px-6 py-3 bg-black text-white rounded-md flex items-center justify-center gap-2 shadow hover:shadow-slate-800 hover:bg-black/90"
          >
            <LuGithub size={20} />
            Signin with Github
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:4001/auth/google";
            }}
            className="px-6 py-3 border border-black text-black rounded-md flex items-center justify-center gap-2 shadow hover:shadow-slate-800"
          >
            <FaGoogle size={20} />
            Signin with Google
          </button>
        </div>
      </main>
    </div>
  );
}
