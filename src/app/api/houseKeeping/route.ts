import { Request, Response } from "express";
import connectMongoDB from "server/libs/mongodb";
import recordMoney from "server/models/recordMoney";

export async function POST(req: Request, res: Response) {
  try {
    const { category, amount, description } = req.body;
    console.log("post로 들어온 데이터", category, amount, description);

    // MongoDB 연결
    await connectMongoDB();


      // MongoDB에 데이터 저장
      const newRecord = await recordMoney.create({ category, amount, description });

    // MongoDB에 데이터 저장 로직 추가
    // 예시: await SomeMongoDBModel.create({ category, amount, description, name });

    res.status(200).json({ success: true, message: "Data successfully saved to MongoDB." });
  } catch (error) {
    console.error("Error while processing POST request:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}
