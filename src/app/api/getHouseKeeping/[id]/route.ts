import { NextResponse } from "next/server";
import connectMongoDB from "server/libs/mongodb";
import recordMoney from "server/models/recordMoney";

export async function GET(request : Request, { params } : any, res: Response) {
    try {
        const {id}  = params;

        await connectMongoDB();
        
        const getSaveData = await recordMoney.find({userid : id}); // findOne() 대신 find() 사용

        console.log("찾은 데이터 값은 !!??", getSaveData);

        if(getSaveData && getSaveData.length > 0) { // 데이터가 있는지와 길이를 확인
            const responseData = getSaveData.map(data => ({
                category: data.category,
                amount: data.amount,
                description: data.description
            }));

            return NextResponse.json(responseData, { status : 201}); // 배열로 반환
        } else {
            return NextResponse.json({ message: "해당 사용자의 데이터를 찾을 수 없습니다." }, { status: 404 });
        }
    } catch (err) {
        console.log("node 코드를 다시 확인해보세요.");
    }
}
