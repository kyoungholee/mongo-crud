
'use client'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { categoryList } from 'utils/categorydata';
import SideBar from '../../../sideBar/page';
import Link from 'next/link';
import { useQuery, useQueryClient } from 'react-query';
import Calendar from 'react-calendar';
import moment from 'moment';
import './accountbook.css'; // CSS 파일 import
import { useSelectedDate } from '../../../../recoil/DateAtom';

interface Transaction {
  id: number;
  category: string;
  amount: string;
  description: string;
  createDate: string;
}

//각 계산 총합의 ts를 설정
interface TotalCalculate {
  allIncome: number;
  expenditure: number;
  communicationExpense: number;
  saving:number;
  remainingMoney: number;
}

const userIdCookie : any | string= getCookie('userId');
const userMonthCookie : any | string= getCookie('month');

const numberWithCommas = (calculateNumber : number | string) => {
  return calculateNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


const RecordMoneyFn = () => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [inputData, setInputData] = useState({
    category: '',
    amount: '',
    description: '',
    userid : userIdCookie,
    createDate: "",
  });
  
  const [getdbData, setGetdbData] = useState([
    {   
        _id: '',
        category: '',
        amount: '',
        description: '',
        createDate: ''
    }
  ]);

  const initialTransaction = {
    category: '',
    amount: '',
    description: '',
  };
  
  const [getdbExpense, setGetdbExpense] = useState([initialTransaction]);
  const [getdbIncome, setGetdbIncome] = useState([initialTransaction]);
  const [getdbSave, setGetdbSave] = useState([initialTransaction]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Date[]>([]);

  let [selectedDate, setSelectedDate] = useState<Date | Date[] | any>();
  
  //총 지출, 수입, 저축에 대한 값을 가져오기 위한 state값
  const [totalCalculate, setTotalCalculate] = useState<TotalCalculate>({
    allIncome: 0,
    expenditure: 0,
    communicationExpense:0,
    remainingMoney: 0,
    saving: 0,
  });

  const [selectedDatere] = useSelectedDate();
  
  const handleDateChange = (date: Date | any | Date[]) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // 이전 값을 가져온 뒤,  선택한 카테고리와 입력한 가격 , 상세내용의 데이터를 저장한다.
      setInputData((prevData) => ({ ...prevData, [name]: value,  createDate: formattedSelectedDate }));
  };

  const getMoneyData = async() => {

    const getResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${userIdCookie}/${userMonthCookie}`);

    const getdbExpenseData = getResponse.data.filter((item: { category: string }) => item.category === 'expenditure');
        console.log("getdbExpenseData", getdbExpenseData);
        setGetdbExpense(getdbExpenseData);

    const getdbIncomeData = getResponse.data.filter((item: { category: string }) => item.category === 'Incoming');
      console.log("getdbExpenseData", getdbIncomeData);
      setGetdbIncome(getdbIncomeData);


    const getdbSaveData = getResponse.data.filter((item: { category: string }) => item.category === 'savings');
      console.log("getdbExpenseData", getdbIncomeData);
      setGetdbSave(getdbSaveData);

      setGetdbData(getResponse.data);

      setInputData({category: '', amount: '', description: '', userid: userIdCookie, createDate: ""});
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 저장 버튼 클릭 시에만 빈 값 확인
  if (!inputData.category || !inputData.amount || !inputData.description) {
    alert("데이터를 정확히 입력하세요.");
    return;
  }

    setSelectedDate("");
    try {
      
      const newTransaction: Transaction = { 
        ...inputData, 
        id: Date.now(), 
        createDate: formattedSelectedDate || new Date().toISOString(), // 빈 문자열이면 현재 날짜로 초기화
      };
  
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);

      setTotalCalculate((prevData) => {
        const amount = parseInt(inputData.amount) || 0;      
        const updatedData = { ...prevData };
                  
        if (inputData.category === 'Incoming') {
          // "수입"을 클릭한 경우에만 allIncome을 업데이트
          updatedData.allIncome += amount;
        } else if(inputData.category === 'expenditure') {
          // 외식비를 클릭한 경우에만 expenditure을 업데이트
          updatedData.expenditure += amount;
        } else if(inputData.category === 'communicationExpense') {
          // 통신비를 클릭한 경우에만 communicationExpense을 업데이트
          updatedData.communicationExpense += amount;
        } else if(inputData.category === 'savings') {
          // 저축을 클릭한 경우에만 savings을 업데이트
          updatedData.saving += amount;
        }  

        return updatedData;
      });
      
      const keepingData = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/houseKeeping`, newTransaction , {
        headers: {
          'Content-Type': 'application/json',
          // 'Cookie': `userId=${userIdCookie}`,
        },
      })

      getMoneyData();
    } catch (err) {
      console.error("API 확인 해보세요");
    }
  };

const fetchMoneyData = async (userId: string, month: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${userId}/${month}`);
  return data;
};

// RecordMoneyFn 컴포넌트 안에서 사용하는 부분 대신 사용할 부분
const { data: moneyData, isLoading, isError, refetch } = useQuery(
  ['moneyData', userIdCookie, userMonthCookie],
  () => fetchMoneyData(userIdCookie, userMonthCookie),
  {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0,
    cacheTime: 300000 // 5분
  }
);
useEffect(() => {
  // 요청이 성공하고 데이터를 가져왔을 때 moneyData 상태 업데이트
  if (moneyData) {
      // 카테고리가 'expenditure'인 데이터만 필터링하여 getdbExpense에 설정
      const getdbExpenseData = moneyData.filter((item: { category: string }) => item.category === 'expenditure');
      setGetdbExpense(getdbExpenseData);

      const getdbIncomeData = moneyData.filter((item: { category: string }) => item.category === 'Incoming');
      setGetdbIncome(getdbIncomeData);

      const getdbSaveData = moneyData.filter((item: { category: string }) => item.category === 'savings');
      setGetdbSave(getdbSaveData);

      // 전체 데이터 설정
      setGetdbData(moneyData);
  }
}, [moneyData]);

  const queryClient = useQueryClient();

const cachedData = queryClient.getQueryData(['moneyData', userIdCookie, userMonthCookie]);
    console.log('Cached data:', cachedData);

    const handleDelete = async (id : string) => {

      console.log("handleDelete", id);

      try {
        // 서버로 삭제 요청을 보냅니다.
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteMoney/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });    

        getMoneyData();
      } catch (error) {
        console.error('삭제 실패:', error);
      }

    };
    

  const expenditureTotalAmount = getdbExpense.reduce((total, category) => {
    return total + parseFloat(category.amount);
  }, 0);

  const IncomeTotalAmount = getdbIncome.reduce((total, category) => {
    return total + parseFloat(category.amount);
  }, 0);

  const SaveTotalAmount = getdbSave.reduce((total, category) => {
    return total + parseFloat(category.amount);
  }, 0);
  
  
// 각 항목의 수입 및 지출을 계산하여 배열로 반환
const totalIncomeForEachItem = getdbData
  .filter(item => item.category === "Incoming")
  .map(item =>  parseFloat(item.amount)
  
  );

const totalExpenseForEachItem = getdbData
  .filter(item => item.category === "expenditure")
  .map(item => parseFloat(item.amount));

  const totalSaveForEachItem = getdbData
  .filter(item => item.category === "savings")
  .map(item => parseFloat(item.amount));


// 총합 계산
const totalAmountdbData = numberWithCommas(totalIncomeForEachItem.reduce((total, amount) => total + amount, 0));
const totalConsumedbData = numberWithCommas(totalExpenseForEachItem.reduce((total, consume) => total + consume, 0));
const totalSavedbData = numberWithCommas(totalSaveForEachItem.reduce((total, save) => total + save, 0));

const totalAmountAsNumber = parseInt(totalAmountdbData.replace(/,/g, ""), 10);
const totalAmountAsNumbersss = parseInt(totalConsumedbData.replace(/,/g, ""), 10);

const totalAmountAsNumberse  = parseInt(totalSavedbData.replace(/,/g, ""), 10);

const remainingMoney = numberWithCommas(totalAmountAsNumber - (totalAmountAsNumbersss + totalAmountAsNumberse));
const formattedSelectedDate = selectedDate instanceof Date ? moment(selectedDate).format('YYYY-MM-DD') : '';


if (!userIdCookie || !userMonthCookie) {
  return <div>Loading...</div>; // 쿠키 값을 불러올 때까지 로딩 상태 표시
}

  return (
  <>
    <header className='flex justify-between px-40 py-4 bg-sky-50'>
      <div className='flex items-center gap-4'>
        <Link className="p-3" href={`/components/home`}>
            ALIVE-MONEY
        </Link>
      </div>
      <SideBar/>
    </header> 
  <div className="container p-10 mx-auto my-8 bg-purple-100">
        <div className='flex items-center justify-between gap-6 mb-10'>
          <h1 className="text-3xl font-bold ">가계부</h1>
          <div className='p-2 text-white border bg-sky-500'>
            <Link href={`/components/monthlyPrice/${getCookie('userId')}/${getCookie('month')}`}>
            한달 가계부 기록 확인하기
            </Link>
            <Link href={`/components/monthlyPrice/${getCookie('userId')}/${getCookie('month')}`}>
            모의투자 해보기
            </Link>
          </div>
          {/* <div className='p-2 border border-black'>ai에게 질문하기</div> */}
        </div>
        
    <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="px-4 py-2 text-white bg-blue-500  absolute right-[690px] top-[370px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        {selectedDate ? (Array.isArray(selectedDate) ? '날짜 선택됨' : formattedSelectedDate) :  "날짜선택"}
      </button>
      {showCalendar && (
        <div className="absolute w-64 mt-2 top-full">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="p-4 my-4 absolute left-[360px] bottom-[35px] w-full  text-center border border-gray-300 rounded-md shadow-md bg-slate-100"
            calendarType="US"
            formatDay={(locale, date) => moment(date).format('D')}
            formatYear={(locale, date) => moment(date).format('YYYY')}
            formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
            tileDisabled={({ date }) => {
              const currentDate = new Date();
              const isBeforeToday = date.getTime() < currentDate.setHours(0, 0, 0, 0);
              const isFirstDayOfMonth = date.getDate() === 1;
              return isBeforeToday && !isFirstDayOfMonth;
          }}
          // 매달 1일이 체크됌 
          tileClassName={({ date }) => {
            return `
                ${selectedRange.length > 1 &&
                date >= selectedRange[0] &&
                date <= selectedRange[selectedRange.length - 1]
                    ? 'bg-blue-500 text-white'
                    : ''}
                ${date.getTime() < Date.now()  ? 'text-gray-200' : ''}
            `;
        }}
          />
        </div>
      )}

        {/* 거래 입력 폼 */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="">
            <div className="mb-4 ">
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <label htmlFor="addMoney" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 수입</label>
                    <span className='h-12 px-4 pt-2 text-center border-2 border-solid border-sky-500'>{
                    totalAmountdbData
                    }원
                    </span>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="allExpense" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 지출</label>
                  <span className='h-12 px-4 pt-2 text-center border-2 border-solid border-sky-500'>{
                    totalConsumedbData
                  }원</span>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="allSave" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 저축</label>
                  <span className='h-12 px-4 pt-2 text-center border-2 border-solid border-sky-500'>{totalSavedbData}원</span>
                </div>
                
                <div className='flex flex-col'>
                  <label htmlFor="remainPay" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 남은 돈</label>
                  <span className='h-12 px-4 pt-2 text-center border-2 border-solid border-sky-500 '>{`${remainingMoney}`}원</span>
                </div>
              </div>

              <div className="flex justify-end gap-4 mb-4 mt-14">
              <div className="relative">

            </div>
                <label htmlFor="category" className="block text-lg font-bold text-gray-600">내역 카테고리</label>
                  <select
                    id="category"
                    name="category"
                    value={inputData.category}
                    onChange={handleChange}
                    className="h-8 border-2 border-solid border-sky-500 form-input"
                  >
                    <option value="" disabled>상세보기</option>
                    {categoryList.map(category => (
                      <option key={category.id} value={category.category}>{category.name}</option>
                    ))}
                  </select>

                 

                <label htmlFor="amount" className="block text-lg font-bold text-gray-600">금액</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={inputData.amount}
                  onChange={handleChange}
                  className="h-8 border-2 border-solid form-input border-sky-500"
                />
              </div>
            </div>
          
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-lg font-bold text-gray-600">수입, 지출 내역을 자세히 적어주세요.</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={inputData.description}
              onChange={handleChange}
              className="w-full border-2 border-solid border-sky-500 form-textarea"
            />
          </div>
          <div className='flex justify-end gap-6'>
            <button type="submit" className="p-2 rounded form-button bg-sky-500">저장</button>
            <button type="submit" className="p-2 bg-red-500 rounded form-button">취소</button>
          </div>

        </form>

        {/* 거래 목록 */}
        <h2 className="mb-2 text-2xl font-bold">1달간 입금 ⸰ 출금 내역</h2>
        <table className="w-full mb-8 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
              <th className="px-6 py-4 text-center border-b">기록 날짜</th>
                <th className="px-6 py-4 text-center border-b">내역 카테고리</th>
                <th className="px-4 py-4 text-center border-b">설명</th>
                <th className="px-4 py-4 text-center border-b">금액</th>
                <th className="px-4 py-4 text-center border-b">삭제여부</th>
              </tr>
            </thead>
          <tbody>
            {getdbData.map((transaction, index) => (
              <tr key={index}>
                  <td className="px-6 py-4 text-center border-b">{transaction.createDate}</td>
                  <td className="px-6 py-4 text-center border-b">{transaction.category}</td>
                  <td className="px-6 py-4 text-center border-b">{transaction.description}</td>
                  <td className="px-6 py-4 text-center border-b">{numberWithCommas(transaction.amount)}원</td>
                  <td className="px-2 py-2 text-center text-red-500 border-b">
                  <button onClick={() => handleDelete(transaction._id)}>삭제🗑️</button>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* 카테고리별 합계 표 */}
        <h2 className="mb-2 text-2xl font-bold">지출</h2>
        <table className="w-full mb-8 border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-2/4 px-4 py-2 border-b">카테고리</th>
              <th className="w-2/4 px-4 py-2 border-b">합계</th>
            </tr>
          </thead>
          <tbody>
            {getdbExpense.slice(0, 1).map((category,index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center border-b">{category.category}</td>
                <td className="px-4 py-2 text-center border-b">{numberWithCommas(expenditureTotalAmount)}원</td>
              </tr>
            ))}
          </tbody>
        </table>


        <h2 className="mb-2 text-2xl font-bold">수입</h2>
        <table className="w-full mb-8 border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-2/4 px-4 py-2 border-b">카테고리</th>
              <th className="w-2/4 px-4 py-2 border-b">합계</th>
            </tr>
          </thead>
          <tbody>
          {getdbIncome.slice(0, 1).map((category,index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center border-b">{category.category}</td>
                <td className="px-4 py-2 text-center border-b">{numberWithCommas(IncomeTotalAmount)}원</td>
              </tr>
            ))}
          </tbody>
        </table>

          <h2 className="mb-2 text-2xl font-bold">저축 & 투자</h2>
        <table className="w-full mb-8 border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-2/4 px-4 py-2 border-b">카테고리</th>
              <th className="w-2/4 px-4 py-2 border-b">합계</th>
            </tr>
          </thead>
          <tbody>
          {getdbSave.slice(0, 1).map((category,index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-center border-b">{category.category}</td>
                <td className="px-4 py-2 text-center border-b">{numberWithCommas(SaveTotalAmount)}원</td>
              </tr>
            ))}
          </tbody>
        </table>
  </div>
</>
    
  );
};

export default RecordMoneyFn;