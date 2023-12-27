import connectMongoDB from "../../../../server/libs/mongodb";
import Register from "../../../../server/models/register";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";



// 가입하기 버튼을 눌르 시 , post요청을 실행해  몽고 디비에 데이터가 저장됌 , 
// 이제 이 데이터를 비밀번호를 먼저 해쉬로 암호화한다.
export async function POST(request : any) {
    const {name, password, email} = await request.json();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("해쉬 값", hashedPassword);

    await connectMongoDB();
    await Register.create({name, password : hashedPassword, email});
    return NextResponse.json({message: "회원가입 축하합니다."}, {status : 201})
}