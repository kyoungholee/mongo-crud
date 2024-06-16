'use client'

import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useState } from 'react';

interface IStock {
    name: string;
    price : string;
}

const stocks = [
  { name: "마이크로소프트", price: `606,101` },
  { name: "애플", price: `297.880` },
  { name: "엔비디아", price: `178.929` },
  { name: "구글", price: `241,878` },
  { name: "아마존", price: `255,540` },
  { name: "테슬라", price: `260,870` },
  { name: "TSMC", price: `236.880` },
];

export default function SimulatedInvestmentPage() {
  const [portfolio, setPortfolio] = useState<IStock[]>([]);

  const buyStock = async(stock: IStock) => {
    const tossPayments = await loadTossPayments(`process.env.PUBLIC_CLIENT_TOSS_PAYMONT_KEY`);

    tossPayments.requestPayment('카드' ,{
        amount: 606000,
        orderId: Math.random().toString(36).slice(2),
        orderName: "마이크로소프트",
        successUrl : `${window.location.origin}/api/payments`,
        failUrl : `${window.location.origin}/api/payments/fail`,
    });
  };

  const sellStock = (stock:any) => {
    setPortfolio(portfolio.filter(item => item.name !== stock.name));
  };

  return (
    <div className="p-8">
        <p>*모의투자 페이지는 이경호개발자가 결제기능을 구현해보고자 만든 페이지이며, 실제 주식 거래와는 아무런 상관이 없습니다.</p>
      <h1 className="mb-6 text-2xl font-bold">주식 순위</h1>
      <h2>주식 구매 리스트 확인하기</h2>
      <div className="grid grid-cols-1 gap-4">
        {stocks.map((stock, index) => (
          <div
            key={stock.name}
            className="flex items-center justify-between p-4 border rounded shadow-md"
          >
            <div className="flex items-center">
              <div className="text-xl font-semibold">{index + 1}.</div>
              <div className="ml-4">
                <div className="text-lg">{stock.name}</div>
                <div className="text-sm text-gray-600">₩{stock.price.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => buyStock(stock)}
                className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
              >
                사기
              </button>
              <button
                onClick={() => sellStock(stock)}
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                팔기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
