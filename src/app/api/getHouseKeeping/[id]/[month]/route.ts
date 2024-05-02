import { NextResponse } from "next/server";
import connectMongoDB from "server/libs/mongodb";
import recordMoney from "server/models/recordMoney";

export async function GET(request: Request, { params }: any, res: Response) {
    try {
        const { id, month } = params; // id와 month 파라미터 받아오기

        console.log("받아온 데이터는 ?? ", id, month );

        await connectMongoDB();


        const getSaveData = await recordMoney.find({
            userid: id,
        });

        const filterDate = getSaveData.filter((item) => {
            const createDate = new Date(item.createDate);
            const itemMonth = `${createDate.getFullYear()}-${(createDate.getMonth() + 1).toString().padStart(2, '0')}`;
            return itemMonth === month; // 월(month)과 일치하는 경우만 반환
        });
        
        const responseData = filterDate.map(data => ({
            _id: data._id,
            category: data.category,
            amount: data.amount,
            description: data.description,
            createDate: data.createDate,
            // updateDate: data.updateDate,
        }));
        
        return NextResponse.json(responseData, { status: 201 });
            return NextResponse.json({ message: "해당 사용자의 데이터를 찾을 수 없습니다." }, { status: 404 });
    }
    catch(err) {
        alert("getHouseKeeping api 확인해보세요.")
    }
}