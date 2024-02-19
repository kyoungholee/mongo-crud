'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';


export default function SideBar() {

  const router = useRouter();

  const [username, setUsername] = useState('');

  useEffect(() => {
    const usernameFromCookie = getCookie('lee44');
    if(usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  },[]);

  const getCookie = (name : string) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  console.log("로그인 계정", username);

  return (
    <div className='flex items-center gap-6 mr-4'>
        <div> 돈의 뉴스</div>
        <Link className="p-3" href={'/components/accountBook'}>
        가계부
        </Link>
        <div> 게시판</div>
        <div> 핫한 돈의 속성</div>
        { username ? ( 
        <div>
        <div>환영합니다. {username}님</div>
        <Link href="/logout">
            로그아웃
          </Link>
        </div>
        ) :(
          <div>
          <Link href="/login">
            로그인
          </Link>
          <Link href="/signup">
            회원가입
          </Link>
        </div>
        )
        }
    </div>
  )
}
