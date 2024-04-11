"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ViewRegister: React.FC = () => {
  const [signform, setSignform] = useState({
    name: '',
    koreaname: '',
    password: '',
    passwordcheck: '',
    gender:"",
    email: '',
    want: "",
  });

  const [errors, setErrors] = useState({
    name: '',
    koreaname: '',
    password: '',
    passwordcheck: '',
    gender:"",
    email: '',
    want: "",
  });

  const router = useRouter();

  const validateForm = () => {
    const newErrors = {
      name: signform.name ? '' : '아이디를 입력하세요.',
      koreaname: signform.koreaname ? '' : '이름을 입력하세요.',
      email: isValidEmail(signform.email) ? '' : '유효한 이메일을 입력하세요.',
      password: signform.password ? '' : '비밀번호를 입력하세요.',
      passwordcheck: signform.passwordcheck ? '' : '비밀번호를 한번 더 입력하세요.',
      gender: signform.gender ? '' : '비밀번호를 한번 더 입력하세요.',
      want: signform.want ? '' : '비밀번호를 한번 더 입력하세요.',
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

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, 
      //페이로드
      signform, {

        //헤더 값
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("해당 값", response);

      //예외처리 코드 다시 로직 추가
      if (response.status === 201) {
        alert('회원가입을 환영합니다.');
        router.push('/');
      }
      else if( response.status === 400) {
        alert("이미 가입된 사용자 입니다.");
      } 
      else {
        alert("다시 작성해주세요.")
      }
    } catch (error) {
      alert("중복된 계정입니다. 다시 입력해주세요.")
      setSignform({
        name: '',
        koreaname: '',
        password: '',
        passwordcheck: '',
        gender:"",
        email: '',
        want: "",
      })
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-signup opacity-70">
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
              value={signform.name}
              name="username"
              onChange={e => setSignform({...signform, name : e.target.value})}
              className="w-full p-2 mt-1 mb-4 border rounded-md"
              placeholder="아이디를 입력해주세요."
            />

            <label htmlFor="koreaname" className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              id="koreaname"
              value={signform.koreaname}
              name="koreaname"
              onChange={e => setSignform({...signform, koreaname : e.target.value})}
              className="w-full p-2 mt-1 mb-4 border rounded-md"
              placeholder="이름을 입력해주세요."
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
              className="w-full p-2 mt-1 mb-2 border rounded-md"
              placeholder="비밀번호 입력하세요."
            />
            <label htmlFor="passwordchek" className="block text-sm font-medium text-gray-700">
              비밀번호확인
            </label>
            <input
              type="password"
              id="passwordchek"
              name="passwordchek"
              value={signform.passwordcheck}
              onChange={e => setSignform({...signform, passwordcheck: e.target.value})}
              className="w-full p-2 mt-1 mb-2 border rounded-md"
              placeholder="비밀번호를 한번 더 입력해주세요."
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
              className="w-full p-2 mt-1 mb-4 border rounded-md"
              placeholder="이메일 입력하세요."
            />

            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              성별
            </label>
            <input
              type="gender"
              id="passwogenderrdchek"
              name="gender"
              value={signform.gender}
              onChange={e => setSignform({...signform, gender: e.target.value})}
              className="w-full p-2 mt-1 mb-4 border rounded-md"
              placeholder="성별을 적어주세요."
            />

            <label htmlFor="want" className="block text-sm font-medium text-gray-700">
              이 사이트에서 얻어가고 싶은 것?
            </label>
            <input
              type="want"
              id="want"
              name="want"
              value={signform.want}
              onChange={e => setSignform({...signform, want: e.target.value})}
              className="w-full p-2 mt-1 mb-2 border rounded-md"
              placeholder="이 사이트에서 얻어가고 싶은것을 맘껏 적어주세요."
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
