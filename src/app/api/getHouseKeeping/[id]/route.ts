import { NextResponse } from "next/server";
import connectMongoDB from "server/libs/mongodb";
import recordMoney from "server/models/recordMoney";

export async function GET(request: Request, { params }: any, res: Response) {
    try {
        const { id, month } = params; // id와 month 파라미터 받아오기

        await connectMongoDB();

        const startDate = new Date(month); // 월의 시작일
        const endDate = new Date(startDate); // 월의 끝일 계산
        endDate.setMonth(endDate.getMonth() + 1);

        const getSaveData = await recordMoney.find({
            userid: id,
            createDate: { $gte: startDate, $lt: endDate } // 해당 월의 범위 지정
        });

        console.log("찾은 데이터 값은 !!??", getSaveData);

        if (getSaveData && getSaveData.length > 0) {
            const responseData = getSaveData.map(data => ({
                category: data.category,
                amount: data.amount,
                description: data.description,
                createDate: data.createDate,
                // updateDate: data.updateDate,
            }));

            return NextResponse.json(responseData, { status: 201 });
        } else {
            return NextResponse.json({ message: "해당 사용자의 데이터를 찾을 수 없습니다." }, { status: 404 });
        }
    } catch (err) {
        console.log("node 코드를 다시 확인해보세요.");
    }
}
