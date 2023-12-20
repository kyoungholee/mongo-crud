"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ViewRegister: React.FC = () => {

    const [signform, setSignform] = useState({
        id : "",
        password : "",
        checkpassword: "",
        email : "",
    })

    const router = useRouter();

    // const [id, setId] = useState<string>("");
    // const [password, setPassword] = useState<string>("");
    // const [checkpassword, setCheckpassword] = useState<string>("");
    // const [email, setEmail] = useState<string>("");

    const SignupHandler = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        router.push('/');

    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">회원가입</h1>
        <form onSubmit={SignupHandler}>
          {/* 여기에 회원가입 양식 필드들을 추가하세요 */}
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
            //   onClick={()=> SignupHandler}
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
