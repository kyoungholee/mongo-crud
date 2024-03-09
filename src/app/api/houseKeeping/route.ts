// route.ts

import { Request, Response } from 'express';
import { NextResponse } from 'next/server';
import connectMongoDB from 'server/libs/mongodb';
import recordMoney from 'server/models/recordMoney';
import { setCookie, getCookie } from 'cookies-next';


export async function POST(req: any, res: any) {
  try {
    const { category, amount, description, userid} = await req.json();
    console.log("post로 들어온 데이터", category, amount, description , userid);

    // MongoDB 연결
    await connectMongoDB();


    // MongoDB에 데이터 저장 로직 추가
    const newRecord = await recordMoney.create({ category, amount, description, userid});

    return NextResponse.json(
      { message: "월급추!!~!!~~ 축하합니다." },
      { status: 201 }
    );
      }catch(err) {
        //   console.error("해당 부분 오류 입니다.");
        //   return res.status(500).json({ message: "서버 오류 발생" });
      }
    }

