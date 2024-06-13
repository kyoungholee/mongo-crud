// pages/investment.js
import { useState } from 'react';

interface IStock {
    name: string;
    price : number
}

const stocks = [
  { name: "마이크로소프트", price: 50000 },
  { name: "애플", price: 50000 },
  { name: "엔비디아", price: 50000 },
  { name: "구글", price: 50000 },
  { name: "아마존", price: 50000 },
  { name: "테슬라", price: 50000 },
  { name: "TSMC", price: 50000 },
];

export default function SimulatedInvestmentPage() {
  const [portfolio, setPortfolio] = useState<IStock[]>([]);

  const buyStock = (stock: IStock) => {
    setPortfolio([...portfolio, stock]);
  };

  const sellStock = (stock:any) => {
    setPortfolio(portfolio.filter(item => item.name !== stock.name));
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">주식 순위</h1>
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
