import { NextResponse } from "next/server";
import connectMongoDB from "server/libs/mongodb";
import Comment from "server/models/comment";

export async function GET() {
    try {
      // MongoDB와 연결하여 모든 토픽을 가져옵니다.
      await connectMongoDB();
      const comments = await Comment.find();
  
      // 토픽을 JSON 형식으로 반환합니다.
      return NextResponse.json({ comments });
    } catch (error) {
      console.error('Failed to fetch comment get 통신:', error);
      // 오류가 발생한 경우 빈 배열을 반환합니다.
      return NextResponse.json({ comments: [] });
    }
  }


export async function POST(request : any) {
    const { content, writer, day } = await request.json();
    //  const imageFile = request.files?.image; // 이미지 파일

    try {
        await connectMongoDB();
        await Comment.create({ content, writer, day });
        return NextResponse.json({ message: "댓글 생성합니다.!!!~~!!!" }, { status: 201 });

    }catch(err) {
        console.error("게시판을 만들어주는 api를 확인해보세요.")
    }
}
