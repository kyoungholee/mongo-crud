"use client"

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-8 py-3 bg-slate-800">
      <Link className="font-bold text-white" href={"/"}>
        GTCoding.
      </Link>

      <Link className="p-3 bg-slate-600" href={'/components/login'}>
        로그인
      </Link>
      <Link className="p-3 bg-slate-600" href={'/components/viewRegister'}>
        회원가입
      </Link>
        <Link className="p-2 bg-white" href={"/components/addTopic"}>
          Add Topic
        </Link>
    </div>
  );
}