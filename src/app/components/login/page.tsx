'use client'

import axios from 'axios';
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
    console.log(name, value);

    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true); // 로딩 시작

      const loginResponse = await axios.post("http://localhost:3000/api/login", loginForm,
       {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 서버에서 받은 토큰을 저장하고 사용자에게 메시지 표시
      const { token } = loginResponse.data;
      console.log(token);

      // 여기에서 토큰을 안전하게 저장 (쿠키 또는 로컬 스토리지 활용)

      alert("로그인 축하드립니다.");
      router.push('/');

    } catch (error) {
      console.error("로그인 실패:");
    } 
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-md w-full`}>
        <div>
          <h2 className={`text-center text-3xl leading-9 font-extrabold text-gray-900`}>로그인</h2>
        </div>
        <form className={`mt-8`} onSubmit={handleSubmit}>
          <div className={`rounded-md shadow-sm`}>
            <div className={`-mt-px relative`}>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`form-input py-3 px-4 block w-full leading-5 rounded-none transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
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
                className={`form-input py-3 px-4 block w-full leading-5 rounded-none transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                placeholder="비밀번호"
                value={loginForm.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={`mt-6`}>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out`}
              disabled={loading} // 로딩 중에는 버튼 비활성화
            >
              {loading ? '로딩 중...' : '로그인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;