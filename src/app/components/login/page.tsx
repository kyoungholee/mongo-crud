'use client'


import React, { useState } from 'react';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    // TODO: 로그인 처리 로직 추가
    console.log('로그인 폼 데이터:', loginForm);
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
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
