"use client"

import React, { useState } from 'react';

const ViewRegister: React.FC = () => {

    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkpassword, setCheckpassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");


    
    const SignupHandler = () => {

        const isEmailValid = (input: string): boolean => {
            // 간단한 이메일 유효성 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input);
          };
        
          const isPasswordValid = (input: string): boolean => {
            // 비밀번호는 최소 8자 이상이어야 합니다.
            return input.length >= 8;
          };
        
        
            // 각 입력 필드의 유효성 검사
            if (!isEmailValid(email)) {
              alert('유효한 이메일을 입력하세요.');
              return;
            }
        
            if (!isPasswordValid(password)) {
              alert('비밀번호는 최소 8자 이상이어야 합니다.');
              return;
            }
        
            if (password !== checkpassword) {
              alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
              return;
            }
        
            // 여기서 서버로 회원가입 요청을 보내거나 다른 로직을 수행할 수 있습니다.
            alert('회원가입이 성공적으로 완료되었습니다!');


    }


    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">회원가입</h1>
        <form>
          {/* 여기에 회원가입 양식 필드들을 추가하세요 */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              type="text"
              id="username"
              value={id}
              name="username"
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
              value={password}
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
              value={checkpassword}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="비밀번호 한번 더 입력하세요."
            />
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="text"
              id="email"
              value={email}
              name="email"
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="이메일 입력하세요."
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              onClick={SignupHandler}
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
