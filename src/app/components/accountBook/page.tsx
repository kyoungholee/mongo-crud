
'use client'
import React, { useState } from 'react';

interface Transaction {
  id: number;
  category: string;
  amount: string;
  description: string;
  name: string;
}

interface TotalCalculate {
  allIncome: number;
  allExpense: number;
  addMoney: number;
}

const countListPlus = [
  {
    id : 0,
    category: 'allExpense',
    name: '외식비',
  },
  {
    id : 1,
    category: 'savings',
    name: '저축(은행적금)',
  },
  {
    id : 2,
    category: 'Incoming',
    name: '수입(월급)',
  },
]

const onlyExpense = countListPlus.filter((item) => item.category === 'allExpense');
const onlySave = countListPlus.filter((item) => item.category === 'savings');
const onlyIncome = countListPlus.filter((item) => item.category === 'Incoming');


const BudgetTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [inputData, setInputData] = useState({
    category: '',
    amount: '',
    description: '',
    name: '',
  });
  const [totalCalculate, setTotalCalculate] = useState<TotalCalculate>({
    allIncome: 0,
    allExpense: 0,
    addMoney: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
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
  
        if (inputData.category === 'Incoming') {
          // "수입"을 클릭한 경우에만 allIncome을 업데이트
          updatedData.allIncome += amount;
        } else if(inputData.category === 'allExpense') {
          // 그 외의 경우에는 allExpense을 업데이트
          updatedData.allExpense += amount;
        }
  
        return updatedData;
      });
  
      // 입력값 초기화
      setInputData({ category: '', amount: '', description: '', name:"" });
    } catch (err) {
      console.error("API 확인 해보세요");
    }
  };
  
  

  const calculateTotal = (category: string) => {
    return transactions.reduce((total, transaction) => {
      return transaction.category === category ? total + parseFloat(transaction.amount) : total;
    }, 0);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="mb-10 text-3xl font-bold">가계부</h1>

      {/* 거래 입력 폼 */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="">
          <div className="mb-4 ">

            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <label htmlFor="addMoney" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 수입</label>
                  <span className='h-12'>{`${totalCalculate.allIncome}`}</span>
                  {/* <input
                    type="text"
                    id="addMoney"
                    value={`${inputData.addMoney} 원`}
                    name="addMoney"
                    onChange={handleChange}
                  /> */}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="allExpense" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 지출</label>
                <span className='h-12'>{`${totalCalculate.allExpense}`}</span>
              </div>

              <div className='flex flex-col'>
              <label htmlFor="allSave" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 총 저축</label>
               
              </div>

              <div className='flex flex-col'>
              <label htmlFor="remainPay" className="block mb-2 text-lg font-bold text-center text-gray-600">이달 남은 돈</label>
              
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mb-4 mt-14">
              <label htmlFor="category" className="block text-lg font-bold text-gray-600">내역 카테고리</label>
                <select
                  id="category"
                  name="category"
                  value={inputData.category}
                  onChange={handleChange}
                  className="h-8 form-input"
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
                className="h-8 form-input"
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
            className="w-full form-textarea"
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
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="px-4 py-2 text-center border-b">{transaction.category}</td>
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


export default BudgetTracker;