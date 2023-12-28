import connectMongoDB from "../../../../server/libs/mongodb";
import Topic from "../../../../server/models/topic";
import { NextResponse } from "next/server";
// import { IncomingMessage } from 'http';
// import { NextApiRequest } from "next";

//요청이 오면 오는 요청대로 받아서 처리해준다.
export async function POST(request : any) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request : any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}