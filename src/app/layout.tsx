
import Navbar from "./api/boards/Navbar";
import "./globals.css";
import { Bonbon, Inter } from "next/font/google";
import { ReactNode } from "react";

//이런 식으 문제가 해결되고 ~, 왜  ReactNode 값을 바로 넣게 되면 에러가 발생하지?
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
        <div className="px-40 mx-auto ">
            <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
export default RootLayout;