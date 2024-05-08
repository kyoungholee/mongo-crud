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


export async function DELETE(request : any) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  }

  // 수정하기

//   export async function PUT(request : any, { params } : any)  {
//     const { id } = params;
//     const { newTitle: title, newDescription: description } = await request.json();
//     await connectMongoDB();
//     await Topic.findByIdAndUpdate(id, { title, description });
//     return NextResponse.json({ message: "Topic updated" }, { status: 200 });
//   }