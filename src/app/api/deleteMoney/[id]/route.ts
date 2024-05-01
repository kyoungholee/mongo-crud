import { Request, Response } from 'express';
import connectMongoDB from 'server/libs/mongodb';
import recordMoney from 'server/models/recordMoney';
import { NextResponse } from 'next/server';
import { message } from 'antd';


export async function DELETE(req: any, { params }: any, res: any) {
  try {
    const { id } = params; // id와 month 파라미터 받아오기 삭제할 항목의 ID를 URL 파라미터에서 가져옴

    console.log("삭제할 id", id);
    // MongoDB 연결
    await connectMongoDB();

    if(id) {

      await recordMoney.deleteMany({ order: id });
    }

  
    // 삭제가 성공하면 클라이언트에게 200 상태 코드와 성공 메시지를 응답
    return NextResponse.json(
      { message: "삭제가 완료되었습니다." },
      { status: 201 }
    );
      }catch(err) {
       {message: "서버 api 코드 확인해보세요."}
      }
    }
