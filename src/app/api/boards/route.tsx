import { NextResponse } from "next/server";
import connectMongoDB from "server/libs/mongodb";
import Topic from "server/models/topic";

export async function POST(request : any) {
    const { title, content, writer, day } = await request.json();
    //  const imageFile = request.files?.image; // 이미지 파일

    try {
        await connectMongoDB();
        await Topic.create({ title, content, writer, day });
        return NextResponse.json({ message: "Topic Created" }, { status: 201 });

    }catch(err) {
        console.error("게시판을 만들어주는 api를 확인해보세요.")
    }
}

export async function GET() {
  try {
    // MongoDB와 연결하여 모든 토픽을 가져옵니다.
    await connectMongoDB();
    const topics = await Topic.find();

    // 토픽을 JSON 형식으로 반환합니다.
    return NextResponse.json({ topics });
  } catch (error) {
    console.error('Failed to fetch topics:', error);
    // 오류가 발생한 경우 빈 배열을 반환합니다.
    return NextResponse.json({ topics: [] });
  }
}


  // 수정하기
  export async function PUT(request : any)  {
    // const { id } = request.params;
    // console.log("업데이트 치는 해당 id", {id});
    const { title, content, writer, day ,aa } = await request.json();

    console.log("해당 데이터 업데이트 칩니다.", { title, content, writer, day ,aa } );
    await connectMongoDB();
    await Topic.findByIdAndUpdate(aa.id, { title, content, writer, day});
    return NextResponse.json({ Topic }, { status: 201 });
  }