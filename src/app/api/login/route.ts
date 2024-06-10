import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from 'express';
import cors from 'cors'
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../server/libs/mongodb";
import Register from "../../../../server/models/register";

export async function POST(req: Request) {
  
  const app = express();
  app.use(cors()); // 모든 출처에서의 요청을 허용

  try {


    // Parse JSON body from the request
    const { username, password } = await req.json();
    const YOUR_SECRET_KEY :any = process.env.SECRET_KEY;

    console.log("name", username, password);

    // Connect to MongoDB
    await connectMongoDB();

    // Check if user exists
    const userExist = await Register.findOne({ name: username });
    console.log("userExist", userExist);

    if (!userExist) {
      return NextResponse.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    console.log("해당 해쉬 데이터", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    // Create JWT token
    const payload = { user: { password: password } };
    const token = await new Promise<string>((resolve, reject) => {
      jwt.sign(payload, YOUR_SECRET_KEY, { expiresIn: "30m" }, (err, token) => {
        if (err) {
          console.error("토큰 생성 에러:", err);
          reject(err);
        } else {
          console.log("생성된 토큰:", token);
          if (token) resolve(token);
        }
      });
    });

    // Format the current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${month}`;

    console.log(formattedDate);

    // Return JSON response with token and message
    return NextResponse.json({ message: "로그인~~!!~~ 축하합니다.", token, formattedDate }, { status: 201 });
  } catch (err) {
    console.error("해당 부분 오류 입니다.", err);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
