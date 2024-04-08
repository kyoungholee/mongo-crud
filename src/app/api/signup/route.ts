import bcrypt from "bcrypt";
import express, { Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import * as dotenv from "dotenv";
import connectMongoDB from "../../../../server/libs/mongodb";
import Register from "../../../../server/models/register";
import { NextResponse } from "next/server";

export async function POST(req: any, res: Response) {
  const { name, koreaname, password, email, gender, want} = await req.json();
  const YOUR_SECRET_KEY: any = process.env.SECRET_KEY;

  dotenv.config();

  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message : "빈 값이 있습니다."});
    }

    const existingUser = await Register.findOne({ email });

    console.log("existingUser",existingUser);
    
    if (existingUser) {
      return res.status(400).json({ message: "해당 이메일로 이미 가입된 사용자가 있습니다." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const payload = {
    //   user: {
    //     email: email,
    //   },
    // };

    // // jwt.sign을 Promise로 감싸고, 비동기적으로 처리
    // const token = await new Promise<string>((resolve, reject) => {
    //   jwt.sign(
    //     payload,
    //     YOUR_SECRET_KEY,
    //     { expiresIn: "30m" },
    //     (err, token) => {
    //       if (err) {
    //         console.error("토큰 생성 에러:", err);
    //         reject(err);
    //       } else {
    //         console.log("생성된 토큰:", token);
    //         if(token) {
    //             resolve(token);

    //         }
    //       }
    //     }
    //   );
    // });

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
    return res.status(500).json({ message: "서버 오류 발생" });
  }
}
