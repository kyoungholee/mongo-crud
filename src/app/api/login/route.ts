import bcrypt from "bcrypt";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import * as dotenv from "dotenv";
import connectMongoDB from "../../../../server/libs/mongodb";
import { NextResponse } from "next/server";
import Register from "../../../../server/models/register";

export async function POST(req: any, res: Response) {
  const { username, password } = await req.json();
 const YOUR_SECRET_KEY: any = process.env.SECRET_KEY;

  console.log("name", username, password)


  const userExist = await Register.findOne({ name: username });

  if (!userExist) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }
  
  // 비밀번호 비교
  const isPasswordValid = await bcrypt.compare(password, userExist.password);

  console.log("해당 해쉬 데이터", isPasswordValid);
  
  if (!isPasswordValid) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }
  dotenv.config();

  try {
   
    const payload = {
      user: {
        password: password,
      },
    };

    // jwt.sign을 Promise로 감싸고, 비동기적으로 처리// ... (이전 코드)

    const token = await new Promise<string>((resolve, reject) => {
      jwt.sign(
        payload,
        YOUR_SECRET_KEY,
        { expiresIn: "30m" },
        (err, token) => {
          if (err) {
            console.error("토큰 생성 에러:", err);
            reject(err);
          } else {
            console.log("생성된 토큰:", token);
            if(token) {
                resolve(token);

            }
          }
        }
      );
    });
// 토큰을 쿠키에 설정

// 응답에 토큰과 메시지를 함께 전송 ==> 서버에서 확인 할 수 있느 음답값

await connectMongoDB();

return NextResponse.json(
  { message: "로그인~~!!~~ 축하합니다.", token },
  { status: 201 }
);
  }catch(err) {
    //   console.error("해당 부분 오류 입니다.");
    //   return res.status(500).json({ message: "서버 오류 발생" });
  }
}
