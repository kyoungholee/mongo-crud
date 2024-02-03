import { Request, Response } from "express";
import { NextResponse } from "next/server";
import connectMongoDB from "server/libs/mongodb";
import recordMoney from "server/models/recordMoney";

export async function POST(req: any, res: Response) {
  try {
    const { category, amount, description } = await req.json();
    console.log("post로 들어온 데이터", category, amount, description);

    // MongoDB 연결
    await connectMongoDB();

    // MongoDB에 데이터 저장 로직 추가
    // 예시: await SomeMongoDBModel.create({ category, amount, description, name });
    const newRecord = await recordMoney.create({ category, amount, description });

    // res.status(200).json({ success: true, message: "Data successfully saved to MongoDB." });

    return NextResponse.json(
      { message: "가계부 작성~~!!~~ 축하합니다." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while processing POST request:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}
