'use client'

import { RecoilRoot } from "recoil";
import Navbar from "./api/boards/Navbar";
import SideBar from "./components/sideBar/page";
import "./globals.css";
import { Bonbon, Inter } from "next/font/google";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query"; 

//이런 식으 문제가 해결되고 ~, 왜  ReactNode 값을 바로 넣게 되면 에러가 발생하지?

const queryClient = new QueryClient()

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function RootLayout ({ children } : {
  children: React.ReactNode
}) {

  return (
    
    <html>
      <body>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
            {/* <header className='flex justify-between px-40 py-4 bg-white'>
                  <div className='flex items-center gap-4'>
                  ALIVE-MONEY
                  </div>
                  <SideBar/>
            </header>  */}
              <div className="px-40 mx-auto ">
                
                  <div>{children}</div>
              </div>
          </RecoilRoot>
    </QueryClientProvider>
      </body>
    </html>
  );
}
export default RootLayout;