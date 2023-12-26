"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ViewRegister: React.FC = () => {
  const [signform, setSignform] = useState({
    id: '',
    password: '',
    checkpassword: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    checkpassword: '',
    email: '',
  });

  const router = useRouter();

  const validateForm = () => {
    const newErrors = {
      id: signform.id ? '' : '아이디를 입력하세요.',
      password: signform.password ? '' : '비밀번호를 입력하세요.',
      checkpassword: signform.checkpassword === signform.password ? '' : '비밀번호가 일치하지 않습니다.',
      email: isValidEmail(signform.email) ? '' : '유효한 이메일을 입력하세요.',
    };

    setErrors(newErrors);

    // 모든 필드에 대해 에러가 없으면 true 반환
    return Object.values(newErrors).every((error) => !error);
  };

  const isValidEmail = (email: string) => {
    // 간단한 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const SignupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      alert('입력값을 확인하세요.');
      return;
    }

    //회원가입이 완료 된 후 몽고 db로 데이터를 보낸디. 
    try{
      const res = await fetch("http://localhost:3000/api/controllers", {
        method : "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({signform}),
      });
      // 여기에 서버로 데이터를 보내는 로직을 추가하세요.

      if(res.ok) {
        alert('회원가입을 환영합니다.');
        router.push('/');
      } else {
        throw new Error("api를 확인 해보세요");
      }
      
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">회원가입</h1>
        <form onSubmit={SignupHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              type="text"
              id="username"
              value={signform.id}
              name="username"
              onChange={e => setSignform({...signform, id : e.target.value})}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="아이디 입력하세요."
            />
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signform.password}
              onChange={e => setSignform({...signform, password: e.target.value})}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="비밀번호 입력하세요."
            />
            <label htmlFor="passwordcheck" className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordcheck"
              name="passwordcheck"
              value={signform.checkpassword}
              onChange={e => setSignform({...signform, checkpassword: e.target.value})}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="비밀번호 한번 더 입력하세요."
            />
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="text"
              id="email"
              value={signform.email}
              onChange={e => setSignform({...signform, email: e.target.value})}
              name="email"
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="이메일 입력하세요."
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewRegister;
