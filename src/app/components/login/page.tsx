'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true); // 로딩 시작

      const loginResponse = await axios.post("http://localhost:3000/api/login", loginForm, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 서버에서 받은 토큰을 저장하고 사용자에게 메시지 표시
          const { token } = loginResponse.data;

        
          // Set the cookie using document.cookie
          document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
          document.cookie = `userId= ${loginForm.username}; path=/; max-age=${60 * 60 * 24 * 7}`;
          
      alert("로그인 축하드립니다.");
      router.push('/components/home');

    } catch (error) {
      alert("잘못된 정보입니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    
    <div className={`min-h-screen bg-main flex items-center bg-cover bg-no-repeat justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 opacity-70`}>
      <div className={`max-w-md w-full`}>
        <div>
          <h2 className={`text-center text-3xl leading-9 font-black text-black`}>로그인</h2>
        </div>
        <form className={`mt-8`} onSubmit={handleSubmit}>
          <div className={`rounded-md shadow-sm`}>
            <div className={`-mt-px relative`}>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`form-input py-3 px-4 block w-full leading-5 rounded-none border-2 border-black transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                placeholder="아이디"
                value={loginForm.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={`mt-6`}>
            <div className={`-mt-px relative`}>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`form-input py-3 px-4 block w-full leading-5 rounded-none border-2 border-black transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                placeholder="비밀번호"
                value={loginForm.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <p className='m-4 text-sm font-bold text-center text-black'>계정이 없으신가요?
            <Link className='p-3 font-bold text-black' href={'/components/viewRegister'}>회원가입</Link>
          </p>

          <div className={`mt-6`}>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out`}
              disabled={loading} // 로딩 중에는 버튼 비활성화
            >
              {loading ? 
            <Link href={'/components/home'}></Link>
              : '로그인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
