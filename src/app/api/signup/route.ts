import bcrypt from "bcrypt";
import express, { Response } from "express";
import cors from 'cors'
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import * as dotenv from "dotenv";
import connectMongoDB from "../../../../server/libs/mongodb";
import Register from "../../../../server/models/register";
import { NextResponse } from "next/server";

export async function POST(req: any, res: Response) {
  const { name, koreaname, password, email, gender, want} = await req.json();
  const YOUR_SECRET_KEY: any = process.env.SECRET_KEY;

  const app = express();
  app.use(cors()); // 모든 출처에서의 요청을 허용

  dotenv.config();

  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return NextResponse.json({ message : "빈 값이 있습니다."});
    }

    const existingUser = await Register.findOne({ email });

    console.log("existingUser",existingUser);
    
    if (existingUser) {
      return NextResponse.json({ message: "해당 이메일로 이미 가입된 사용자가 있습니다." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 토큰을 응답에 추가하여 클라이언트로 전송
    await connectMongoDB();
    await Register.create({ name, koreaname, password: hashedPassword, email, gender, want });

    // 응답에 토큰과 메시지를 함께 전송
    return NextResponse.json(
      { message: "회원가입 축하합니다." },
      { status: 201 }
    );
  } catch (err) {
    console.error("해당 부분 오류 입니다.");
    return NextResponse.json({ message: "서버 오류 발생" });
  }
}
