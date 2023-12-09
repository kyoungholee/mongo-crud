"use client"

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        GTCoding.
      </Link>
      <Link className="bg-white p-2" href={"/addTopic"}>
        Add Topic
      </Link>
    </div>
  );
}