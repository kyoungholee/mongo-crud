'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function SideBar() {

  const router = useRouter();

  return (
    <div className='flex items-center gap-6 mr-4'>
        <div> 돈의 뉴스</div>
        <Link className="p-3" href={'/components/accountBook'}>
        가계부
        </Link>
        <div> 게시판</div>
        <div> 핫한 돈의 속성</div>
        <div> 로그인</div>
        <div> 회원가입</div>
    </div>
  )
}
