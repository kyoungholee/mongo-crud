import connectMongoDB from "../../../../server/libs/mongodb";
import Register from "../../../../server/models/register";
import { NextResponse } from "next/server";



export async function POST(request : any) {
    const {name, password, email} = await request.json();
    await connectMongoDB();
    await Register.create({name, password, email});
    return NextResponse.json({message: "회원가입 축하합니다."}, {status : 201});

}