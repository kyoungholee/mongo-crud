'use client';

import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useState } from 'react';

interface IStock {
    name: string;
    price: string;
}

const stocks: IStock[] = [
  { name: "마이크로소프트", price: '606101' },
  { name: "애플", price: '297880' },
  { name: "엔비디아", price: '178929' },
  { name: "구글", price: '241878' },
  { name: "아마존", price: '255540' },
  { name: "테슬라", price: '260870' },
  { name: "TSMC", price: '236880' },
];

export default function SimulatedInvestmentPage() {
  const [portfolio, setPortfolio] = useState<IStock[]>([]);

  const buyStock = async (stock: IStock) => {
    try {
      //토스의 클라이언트 키를 활용해 데이터 통신함
      const tossPayments = await loadTossPayments(`${process.env.NEXT_PUBLIC_CLIENT_TOSS_PAYMONT_KEY}`);


      tossPayments.requestPayment('카드', {
        amount: Number(stock.price.replace(/,/g, '')), // price를 숫자로 변환
        orderId: Math.random().toString(36).slice(2), //임의의 문자열 생성
        orderName: stock.name,
        successUrl: `${window.location.origin}/components/pay`,
        failUrl: `${window.location.origin}/api/payments/fail`,
      });
    } catch (error) {
      console.error('결제 요청 오류:', error);
    }
  };

  const sellStock = (stock: IStock) => {
    setPortfolio(portfolio.filter(item => item.name !== stock.name));
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">주식 순위</h1>
      <div className="mb-5">*모의투자 페이지는 이경호개발자가 결제기능을 구현해보고자 만든 페이지이며, 실제 주식 거래와는 아무런 상관이 없습니다.</div>
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
                <div className="text-sm text-gray-600">₩{Number(stock.price.replace(/,/g, '')).toLocaleString()}</div>
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
