'use client'
import { useState } from "react";
import SideBar from "./components/sideBar/page";
import Login from "./components/login/page";

function Home() {
  // 로그인 상태를 관리하는 useState 훅을 사용합니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn && ( // 로그인되지 않았을 때만 헤더를 표시합니다.
        <header className='flex justify-between px-40 py-4 bg-white'>
          <div className='flex items-center gap-4'>
            ALIVE-MONEY
          </div>
          <SideBar />
        </header>
      )}
      <Login  /> {/* Login 컴포넌트에 setIsLoggedIn을 props로 전달하여 로그인 상태를 업데이트할 수 있게 합니다. */}
    </>
  );
}

export default Home;
