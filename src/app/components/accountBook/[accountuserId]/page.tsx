
'use client'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { categoryList } from 'utils/categorydata';
import SideBar from '../../sideBar/page';
import Link from 'next/link';
// import { CalendarPage } from '../../calendarPage/page';
import Calendar from 'react-calendar';
import moment from 'moment';




interface Transaction {
  id: number;
  category: string;
  amount: string;
  description: string;
  createDate: string;
  // name: string;
}

//각 계산 총합의 ts를 설정
interface TotalCalculate {
  allIncome: number;
  expenditure: number;
  communicationExpense: number;
  saving:number;
  remainingMoney: number;
}

// interface RecordMoneyFnProps {
//   formattedSelectedDate: string;
// }
// const onlyExpense = countListPlus.filter((item) => item.category === 'expenditure' || item.category === 'communicationExpense');
// const onlySave = countListPlus.filter((item) => item.category === 'savings');
// const onlyIncome = countListPlus.filter((item) => item.category === 'Incoming');

//쿠키 값
const userIdCookie = getCookie('userId');


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
    {   category: '',
        amount: '',
        description: '',
        createDate: ''
    }
  ]);

  const [getdbExpense, setGetdbExpense] = useState([
    {   category: '',
        amount: '',
        description: '',
    }
  ]);

  const [getdbIncome, setGetdbIncome] = useState([
    {   category: '',
        amount: '',
        description: '',
    }
  ]);
  
  const [getdbSave, setGetdbSave] = useState([
    {   category: '',
        amount: '',
        description: '',
    }
  ]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | any>();
  const [selectedRange, setSelectedRange] = useState<Date[]>([]);
  
  //총 지출, 수입, 저축에 대한 값을 가져오기 위한 state값
  const [totalCalculate, setTotalCalculate] = useState<TotalCalculate>({
    allIncome: 0,
    expenditure: 0,
    communicationExpense:0,
    remainingMoney: 0,
    saving: 0,
  });

  
  const router = useParams();
  const id = router.accountuserId;

  const handleDateChange = (date: Date | any | Date[]) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // 이전 값을 가져온 뒤,  선택한 카테고리와 입력한 가격 , 상세내용의 데이터를 저장한다.
      setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {





  const getTileClassName = ({ date }: { date: Date }) => {
    const dateMilliseconds = date.getTime();
    const selectedRangeMilliseconds = selectedRange.map((date) => date.getTime());
  
    // 선택한 기간 중 첫 날짜부터 마지막 날짜까지 파란색으로 칠해줌
    if (
      selectedRangeMilliseconds.length > 1 &&
      dateMilliseconds >= Math.min(...selectedRangeMilliseconds) &&
      dateMilliseconds <= Math.max(...selectedRangeMilliseconds)
    ) {
      return 'bg-blue-500 text-white';
    }
  
    // 단일 선택한 날짜는 파란색으로 표시
    if (selectedDate && dateMilliseconds === selectedDate.getTime()) {
      return 'bg-blue-500 text-white';
    }
  
    return '';
  };

      // const newTransaction: Transaction = { ...inputData, id: Date.now() };
      const newTransaction: Transaction = { ...inputData, id: Date.now(), createDate: formattedSelectedDate };

      // if(newTransaction.createDate === "") {
      //   alert("Please select a date");
      //   return;
      // }
      // else if(newTransaction.amount === '' || newTransaction.category === '' || newTransaction.description === "") {
      //   alert("데이터를 정확히 입력하세요.");
      //   return;
      // }
     

      console.log(newTransaction.createDate);
  
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);


     

      setTotalCalculate((prevData) => {
        const amount = parseInt(inputData.amount) || 0;      
        const updatedData = { ...prevData };

          // updatedData.remainingMoney = updatedData.allIncome - updatedData.allExpense - updatedData.saving
          
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

      console.log("keepingData", keepingData);

         // 서버에서 새로운 데이터 가져오기
         //반드시 ReactQuery를 사용해 볼것!!!!!!!!!!!!!!!!!!
    const getResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${id}`);

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

    setInputData({ category: '', amount: '', description: '', userid: userIdCookie, createDate: ''});
    } catch (err) {
      console.error("API 확인 해보세요");
    }
  };

  useEffect(() => {
    const getMoneyData = async () => {
      try {
        const getResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getHouseKeeping/${id}`);
        console.log("getData", getResponse.data);
  
        // 카테고리가 'expenditure'인 데이터만 필터링하여 getdbExpense에 설정
        const getdbExpenseData = getResponse.data.filter((item: { category: string }) => item.category === 'expenditure');
        console.log("getdbExpenseData", getdbExpenseData);
        setGetdbExpense(getdbExpenseData);

        const getdbIncomeData = getResponse.data.filter((item: { category: string }) => item.category === 'Incoming');
        console.log("getdbExpenseData", getdbIncomeData);
        setGetdbIncome(getdbIncomeData);

        const getdbSaveData = getResponse.data.filter((item: { category: string }) => item.category === 'savings');
        console.log("getdbExpenseData", getdbIncomeData);
        setGetdbSave(getdbSaveData);

  
  
        // 전체 데이터 설정
        setGetdbData(getResponse.data);
      } catch (err) {
        console.error("api 확인해주세요.")
      }
    };
  
    console.log("해당 가입 이름", id);
    getMoneyData();
  }, [id]);
  

  const calculateTotal = (category: string) => {
    return transactions.reduce((total, transaction) => {
      return transaction.category === category ? total + parseFloat(transaction.amount) : total;
    }, 0);
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
  
  // const calculateTotalIncome = (amountdbData: number) => { 
  //   // onlyIncome 배열의 요소들을 합산
  //   const totalIncome = onlyIncome.reduce((total, category) => {
  //     return total + calculateTotal(category.category);
  //   }, 0) + amountdbData;
  
  //   return totalIncome;
  // };

  // const calculateTotalConsume = (consumedbData: number) => {
  //   const totalExpense = onlyExpense.reduce((total, category) => {
  //     return total + calculateTotal(category.category);
  //   }, 0) + consumedbData
    
  //   return totalExpense;
  // }


  
  // // 각 item의 amount 값을 숫자로 변환하여 calculateTotalIncome 함수에 전달하고, 반환값을 문자열이 아닌 숫자로 변환하여 반환
  // const totalIncomeForEachItem = getdbData.map(item => {
  //   if(item.category === "Incoming") {
  //      return calculateTotalIncome(Number(item.amount))
  //   }
  // });

  // const totalExpenseForEachItem = getdbData.map(item => {
  //   if(item.category === 'expenditure') {
  //     return calculateTotalConsume(Number(item.amount))
  //   }
  // });

  
  
  // // 총합 계산
  // const totalAmountdbData = totalIncomeForEachItem.reduce((total: number, amount: number | undefined) => {
  //   if(amount === undefined) {
  //     return total;
  //   }
  //   return total + amount;
  // }, 0);

  // const totalConsumedbData = totalExpenseForEachItem.reduce((total: number, consume: number | undefined) => {
  //   if(consume === undefined) {
  //     return total;
  //   }
  //   return total + consume;
  // }, 0);

// 카테고리별 총 금액을 계산하는 함수
// const calculateTotalByCategory = (category: string, transactions: Transaction[]) => {

//   console.log("calculateTotalByCategory", category, transactions);
//   return transactions
//     .filter(transaction => transaction.category === category)

//     .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

// };





// 수입 총액 계산
// const totalIncome = onlyIncome.reduce((total, category) => {
//   return total + calculateTotalByCategory(category.category, transactions);
// }, 0);

// // 지출 총액 계산
// const totalExpense = onlyExpense.reduce((total, category) => {
//   return total + calculateTotalByCategory(category.category, transactions);
// }, 0);

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

const remainingMoney = numberWithCommas(parseInt(totalAmountdbData) - (parseInt(totalConsumedbData) + parseInt(totalSavedbData)));


const formattedSelectedDate = selectedDate instanceof Date ? moment(selectedDate).format('YYYY-MM-DD') : '';


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
          <div className='p-2 border border-black'>
            <Link href={`/components/monthlyPrice/${getCookie('userId')}`}>
            한달 가계부 기록 확인하기
            </Link>
          </div>
          <div className='p-2 border border-black'>ai에게 질문하기</div>
        </div>
        {/* <p>Post: {router.query.accountuserId}</p> */}

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
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        {selectedDate ? (Array.isArray(selectedDate) ? '날짜 선택됨' : formattedSelectedDate) : '날짜 선택'}
      </button>
      {showCalendar && (
        <div className="absolute w-64 mt-2 top-full">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="p-4 my-4 text-center border border-gray-300 rounded-md shadow-md bg-slate-100"
            calendarType="US"
            formatDay={(locale, date) => moment(date).format('D')}
            formatYear={(locale, date) => moment(date).format('YYYY')}
            formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
            tileClassName={({ date }) =>
              selectedRange.length > 1 &&
              date >= selectedRange[0] &&
              date <= selectedRange[selectedRange.length - 1]
                ? 'bg-blue-500 text-white'
                : ''
            }
          />
        </div>
      )}
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

              </tr>
            </thead>
          <tbody>
            {getdbData.map((transaction, index) => (
              <tr key={index}>
                  <td className="px-6 py-4 text-center border-b">{transaction.createDate}</td>
                  <td className="px-6 py-4 text-center border-b">{transaction.category}</td>
                  <td className="px-6 py-4 text-center border-b">{transaction.description}</td>
                  <td className="px-6 py-4 text-center border-b">{numberWithCommas(transaction.amount)}원</td>
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