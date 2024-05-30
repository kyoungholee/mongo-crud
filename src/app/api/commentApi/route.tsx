import { NextResponse } from "next/server";
import connectMongoDB from "server/libs/mongodb";
import Comment from "server/models/comment";

export async function GET(request: any) {
  try {
    // MongoDB와 연결
    await connectMongoDB();

    // 요청에서 postId 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    console.log("postId=========", postId);

    // 특정 게시글에 대한 댓글만 찾기
    const comments = await Comment.find({ postId });

    // 댓글을 JSON 형식으로 반환
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Failed to fetch comment GET request:', error);
    // 오류가 발생한 경우 빈 배열을 반환
    return NextResponse.json({ comments: [] });
  }
}


export async function POST(request : any) {
    const { content, writer, day, postId } = await request.json();
    //  const imageFile = request.files?.image; // 이미지 파일

    try {
        await connectMongoDB();
        await Comment.create({ content, writer, day, postId });
        return NextResponse.json({ message: "댓글 생성합니다.!!!~~!!!" }, { status: 201 });

    }catch(err) {
        console.error("게시판을 만들어주는 api를 확인해보세요.")
    }
}
