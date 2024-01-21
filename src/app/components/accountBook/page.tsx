'use client'

import React, { useState } from 'react';

interface Transaction {
  id: number;
  category: string;
  amount: string;
  description: string;
}

const countlist = [
  '외식비', '생활품', '교육비/문화', '교통비', '통신비', '청약 돈', '미용', '의료비','저축(은행적금)','저축(결혼자금)', '저축(아파트 청약)', '저축(주식투자)',
  '수입(월급)','수입(투자로 번돈)','수입(부업)',

]

const categories = [
  '외식비', '생활품', '교육비/문화', '교통비', '통신비', '청약 돈', '미용', '의료비',
];
const savings = [
  '저축(은행적금)','저축(결혼자금)', '저축(아파트 청약)', '저축(주식투자)'
  ];
  const income = [
  '수입(월급)','수입(투자로 번돈)','수입(부업)',
  ]


const BudgetTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [inputData, setInputData] = useState({
    category: '',
    amount: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTransaction: Transaction = { ...inputData, id: Date.now() };
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    setInputData({ category: '', amount: '', description: '' });
  };

  const calculateTotal = (category: string) => {
    return transactions.reduce((total, transaction) => {
      return transaction.category === category ? total + parseFloat(transaction.amount) : total;
    }, 0);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="mb-4 text-3xl font-bold">가계부</h1>

      {/* 거래 입력 폼 */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex justify-center gap-6">
          <div className="mb-4 ">
          {/* <div className="container mx-auto mt-8">
            <label htmlFor="datepicker" className="block text-gray-700">Choose a date:</label>
            <input type="text" id="datepicker" className="p-2 mt-1 border rounded-md" placeholder="Select a date" />
          </div> */}

            <label htmlFor="category" className="block text-lg font-bold text-gray-600">내역 카테고리</label>
            <select
              id="category"
              name="category"
              value={inputData.category}
              onChange={handleChange}
              className="h-8 form-input"
            >
              <option value="" disabled>상세보기</option>
              {countlist.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
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
            <th className="px-4 py-2 text-center border-b">금액</th>
            <th className="px-4 py-2 text-center border-b">설명</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="px-4 py-2 text-center border-b">{transaction.category}</td>
              <td className="px-4 py-2 text-center border-b">{transaction.amount}원</td>
              <td className="px-4 py-2 text-center border-b">{transaction.description}</td>
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
          {categories.map(category => (
            <tr key={category}>
              <td className="px-4 py-2 text-center border-b">{category}</td>
              <td className="px-4 py-2 text-center border-b">{calculateTotal(category)}원</td>
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
          {income.map(income => (
            <tr key={income}>
              <td className="px-4 py-2 text-center border-b">{income}</td>
              <td className="px-4 py-2 text-center border-b">{calculateTotal(income)}원</td>
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
          {savings.map(save => (
            <tr key={save}>
              <td className="px-4 py-2 text-center border-b">{save}</td>
              <td className="px-4 py-2 text-center border-b">{calculateTotal(save)}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default BudgetTracker;
