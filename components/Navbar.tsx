"use client"

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-8 py-3 bg-slate-800">
      <Link className="font-bold text-white" href={"/"}>
        GTCoding.
      </Link>
      <div>
        <Link className="p-4 bg-white" href={"/register"}> 회원가입</Link>
        <Link className="p-2 bg-white" href={"/addTopic"}>
          Add Topic
        </Link>
      </div>
    </div>
  );
}