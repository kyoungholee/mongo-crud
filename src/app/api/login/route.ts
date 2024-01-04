import bcrypt from "bcrypt";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import * as dotenv from "dotenv";
import connectMongoDB from "../../../../server/libs/mongodb";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import Register from "../../../../server/models/register";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, password } = await req.body;
  const YOUR_SECRET_KEY: any = process.env.SECRET_KEY;

  console.log("name", name, password)

  await connectMongoDB();

  const userExist = await Register.findOne(name);

  console.log("해당 값 존재 여부",userExist);

  if (!userExist) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }

return NextResponse.json(
  { message: "로그인~~!!~~ 축하합니다." },
  { status: 201 }
);

  // } catch (err) {
  //   console.error("해당 부분 오류 입니다.");
  //   return res.status(500).json({ message: "서버 오류 발생" });
  // }
}
