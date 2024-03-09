import { Request, Response } from "express";
import { NextResponse } from "next/server";
import connectMongoDB from "server/libs/mongodb";
import recordMoney from "server/models/recordMoney";

export async function GET(request : Request, { params } : any, res: Response) {
    try {
      const {id}  = params;

      await connectMongoDB();
      
      const getSaveData = recordMoney.findOne({userid : id});

      console.log("찾은 데이터 값은 !!??", getSaveData);

      if (getSaveData) {
      return  NextResponse.json({ message: "DB에 저장된 값들을 전달합니다.", data: getSaveData }, {status : 201});
    } else {
      return NextResponse.json({ message: "해당 사용자의 데이터를 찾을 수 없습니다." }, {status : 404});
    }
    
    } catch (err) {
      console.log(err);
    }
  }