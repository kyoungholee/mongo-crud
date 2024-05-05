'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import Cookie from 'js-cookie';


export default function SideBar(){

  const router = useRouter();

  const [username, setUsername] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userCookieValue = await getCookie('userId');
        if (userCookieValue) {
          setUsername(userCookieValue);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    }
  
    fetchUserData();
  }, []);

  const handleLogout = () => {
    Cookie.remove('userId');
    Cookie.remove('token');
  }

  const aa =  getCookie('userId');
  const aa22 =  getCookie('month');
  

  return (
    <>
        <div className='flex items-center gap-6 mr-4'>
        {/* <div> 돈의 뉴스</div> */}
        <Link className="p-3" href={`/components/accountBook/${aa}/${aa22}`}>
        가계부
        </Link>
        <Link className="p-3" href={`/components/boardTopic`}>
        돈 정보 게시판
        </Link>
    </div>
    <div className='flex items-center gap-10'>
        { username ? ( 
        <div className='flex items-center gap-6'>
          <div>환영합니다. {username} 님</div>
          <Link href="/" onClick={handleLogout}>
            로그아웃
          </Link>
        </div>
        ) :(
          <div className='flex items-center gap-10'>
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
    </>

      
  )
}
