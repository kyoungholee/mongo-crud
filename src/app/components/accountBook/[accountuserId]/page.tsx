
'use client'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  category: string;
  amount: string;
  description: string;
  // name: string;
}

//각 계산 총합의 ts를 설정
interface TotalCalculate {
  allIncome: number;
  foodExpense: number;
  communicationExpense: number;
  saving:number;
  remainingMoney: number;
}

//db에서 데이터를 가져오지 않고 json형태로 구현
const countListPlus = [
  {
    id: 0,
    category: 'foodExpense', // 'allExpense' 대신에 'foodExpense'로 수정
    name: '외식비',
  },
  {
    id: 1,
    category: 'communicationExpense', // 'allExpense' 대신에 'communicationExpense'로 수정
    name: '통신비',
  },
  {
    id: 2,
    category: 'savings',
    name: '저축(은행적금)',
  },
  {
    id: 3,
    category: 'Incoming',
    name: '수입(월급)',
  },
];

const onlyExpense = countListPlus.filter((item) => item.category === 'foodExpense' || item.category === 'communicationExpense');
const onlySave = countListPlus.filter((item) => item.category === 'savings');
const onlyIncome = countListPlus.filter((item) => item.category === 'Incoming');

//쿠키 값
const userIdCookie = getCookie('userId');

const RecordMoneyFn: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [inputData, setInputData] = useState({
    category: '',
    amount: '',
    description: '',
    userid : userIdCookie,
  });
  
  const [getdbData, setGetdbData] = useState([
    {   category: '',
        amount: '',
        description: '',
        index : 1,
    }
  ]);


  //총 지출, 수입, 저축에 대한 값을 가져오기 위한 state값
  const [totalCalculate, setTotalCalculate] = useState<TotalCalculate>({
    allIncome: 0,
    foodExpense: 0,
    communicationExpense:0,
    remainingMoney: 0,
    saving: 0,
  });

  const router = useParams();
  const id = router.accountuserId;
  
  useEffect(() => {
    const getMoneyData = async () => {
      try {
        const getResponse = await axios.get(`http://localhost:3000/api/getHouseKeeping/${id}`);

        console.log("getData", getResponse.data);

        setGetdbData(getResponse.data);
      }
  catch(err) {
        console.error("api 확인해주세요.")
      }
    }
    console.log("해당 가입 이름", id ,getMoneyData());
  },[id])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // 이전 값을 가져온 뒤,  선택한 카테고리와 입력한 가격 , 상세내용의 데이터를 저장한다.
      setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const newTransaction: Transaction = { ...inputData, id: Date.now() };
  
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);


     

      setTotalCalculate((prevData) => {
        const amount = parseInt(inputData.amount) || 0;      
        const updatedData = { ...prevData };

          // updatedData.remainingMoney = updatedData.allIncome - updatedData.allExpense - updatedData.saving
          
        if (inputData.category === 'Incoming') {
          // "수입"을 클릭한 경우에만 allIncome을 업데이트
          updatedData.allIncome += amount;
        } else if(inputData.category === 'foodExpense') {
          // 외식비를 클릭한 경우에만 foodExpense을 업데이트
          updatedData.foodExpense += amount;
        } else if(inputData.category === 'communicationExpense') {
          // 통신비를 클릭한 경우에만 communicationExpense을 업데이트
          updatedData.communicationExpense += amount;
        } else if(inputData.category === 'savings') {
          // 저축을 클릭한 경우에만 savings을 업데이트
          updatedData.saving += amount;
        }  

        return updatedData;
      });

      const keepingData = await axios.post("http://localhost:3000/api/houseKeeping", inputData , {
        headers: {
          'Content-Type': 'application/json',
          // 'Cookie': `userId=${userIdCookie}`,
        },
      })

      console.log("해당 가계부 데이터", keepingData);
  
      // 데이터 입력 후 초기화
      setInputData({ category: '', amount: '', description: '', userid: userIdCookie});
    } catch (err) {
      console.error("API 확인 해보세요");
    }
  };

  const calculateTotal = (category: string) => {
    return transactions.reduce((total, transaction) => {
      return transaction.category === category ? total + parseFloat(transaction.amount) : total;
    }, 0);
  };

  const calculateTotalIncome = () => {
    const totalIncome = onlyIncome.reduce((total, category) => {
      return total + calculateTotal(category.category);
    }, 0);
    return totalIncome;
  };
  
  const calculateTotalExpense = () => {
    const totalExpense = onlyExpense.reduce((total, category) => {
      return total + calculateTotal(category.category);
    }, 0);
    return totalExpense;
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="mb-10 text-3xl font-bold">가계부</h1>
       {/* <p>Post: {router.query.accountuserId}</p> */}

      {/* 거래 입력 폼 */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="">
          <div className="mb-4 ">

            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <label htmlFor="addMoney" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 수입</label>
                  <span className='h-12 pt-2 text-center border-2 border-solid border-sky-500'>{`${calculateTotalIncome()}`}원</span>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="allExpense" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 지출</label>
                <span className='h-12 pt-2 text-center border-2 border-solid border-sky-500'>{`${calculateTotalExpense()}`}원</span>
              </div>

              <div className='flex flex-col'>
              <label htmlFor="allSave" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 저축</label>
              <span className='h-12 pt-2 text-center border-2 border-solid border-sky-500'>{`${totalCalculate.saving}`}원</span>
               
              </div>

              <div className='flex flex-col'>
              <label htmlFor="remainPay" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 남은 돈</label>
              <span className='h-12 pt-2 text-center border-2 border-solid border-sky-500 '>{`${totalCalculate.remainingMoney}`}원</span>
              
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mb-4 mt-14">
              <label htmlFor="category" className="block text-lg font-bold text-gray-600">내역 카테고리</label>
                <select
                  id="category"
                  name="category"
                  value={inputData.category}
                  onChange={handleChange}
                  className="h-8 border-2 border-solid border-sky-500 form-input"
                >
                  <option value="" disabled>상세보기</option>
                  {countListPlus.map(category => (
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
            <th className="px-4 py-2 text-center border-b">내역 카테고리</th>
            <th className="px-4 py-2 text-center border-b">설명</th>
            <th className="px-4 py-2 text-center border-b">금액</th>

          </tr>
        </thead>
        <tbody>
          {getdbData.map(transaction=> (
            <tr key={transaction.index}>
              <td className="px-4 py-2 text-center border-b">{transaction.amount}</td>
              <td className="px-4 py-2 text-center border-b">{transaction.description}</td>
              <td className="px-4 py-2 text-center border-b">{transaction.amount}원</td>

            </tr>
          ))}
         

        
        </tbody>
      </table>

      {/* 카테고리별 합계 표 */}
      <h2 className="mb-2 text-2xl font-bold">지출</h2>
      <table className="w-full mb-8 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b">카테고리</th>
            <th className="px-4 py-2 border-b">합계</th>
          </tr>
        </thead>
        <tbody>
          {onlyExpense.map(category => (
            <tr key={category.id}>
              <td className="px-4 py-2 text-center border-b">{category.name}</td>
              <td className="px-4 py-2 text-center border-b">{calculateTotal(category.category)}원</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h2 className="mb-2 text-2xl font-bold">수입</h2>
      <table className="w-full mb-8 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b">카테고리</th>
            <th className="px-4 py-2 border-b">합계</th>
          </tr>
        </thead>
        <tbody>
          {onlyIncome.map(income => (
            <tr key={income.id}>
              <td className="px-4 py-2 text-center border-b">{income.name}</td>
              <td className="px-4 py-2 text-center border-b">{calculateTotal(income.category)}원</td>
            </tr>
          ))}
        </tbody>
      </table>

        <h2 className="mb-2 text-2xl font-bold">저축</h2>
      <table className="w-full mb-8 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b">카테고리</th>
            <th className="px-4 py-2 border-b">합계</th>
          </tr>
        </thead>
        <tbody>
          {onlySave.map(save => (
            <tr key={save.id}>
              <td className="px-4 py-2 text-center border-b">{save.name}</td>
              <td className="px-4 py-2 text-center border-b">{calculateTotal(save.category)}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default RecordMoneyFn;