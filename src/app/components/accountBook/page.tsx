'use client'

import React, { useState } from 'react';

interface Transaction {
  id: number;
  category: string;
  amount: string;
  description: string;
}

const categories = [
  '외식비', '생활품', '교육비/문화', '교통비', '통신비', '청약 돈', '미용', '의료비'
];

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
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-600">카테고리</label>
            <select
              id="category"
              name="category"
              value={inputData.category}
              onChange={handleChange}
              className="form-input"
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">금액</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={inputData.amount}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">설명</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={inputData.description}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
        <button type="submit" className="form-button">저장</button>
      </form>

      {/* 거래 목록 */}
      <h2 className="mb-2 text-2xl font-bold">거래 목록</h2>
      <table className="w-full mb-8 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b">카테고리</th>
            <th className="px-4 py-2 border-b">금액</th>
            <th className="px-4 py-2 border-b">설명</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="px-4 py-2 border-b">{transaction.category}</td>
              <td className="px-4 py-2 border-b">{transaction.amount}</td>
              <td className="px-4 py-2 border-b">{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 카테고리별 합계 표 */}
      <h2 className="mb-2 text-2xl font-bold">카테고리별 합계</h2>
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
              <td className="px-4 py-2 border-b">{category}</td>
              <td className="px-4 py-2 border-b">{calculateTotal(category)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default BudgetTracker;
