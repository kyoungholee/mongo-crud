import { Request, Response } from 'express';
import connectMongoDB from 'server/libs/mongodb';
import recordMoney from 'server/models/recordMoney';

export async function Delete(req: Request, res: Response) {
  try {
    const id = req.params.id; // 삭제할 항목의 ID를 URL 파라미터에서 가져옴

    console.log("삭제할 id", id);
    // MongoDB 연결
    await connectMongoDB();

    // MongoDB에서 해당 ID에 해당하는 항목 삭제
    await recordMoney.findByIdAndDelete(id);

    // 삭제가 성공하면 클라이언트에게 200 상태 코드와 성공 메시지를 응답
    return res.status(200).json({ message: '삭제 성공' });
  } catch (error) {
    console.error('삭제 실패:', error);
    // 삭제 실패 시 500 상태 코드와 오류 메시지를 응답
    return res.status(500).json({ message: '서버 오류 발생' });
  }
}
