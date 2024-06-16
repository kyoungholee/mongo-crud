import React from 'react'

export default async function PayCompletePage() {

  const secretKey = process.env.NEXT_PUBLIC_CLIENT_TOSS_SECRET_KEY  || "";
  const basicToken = Buffer.from(`${secretKey};`, 'utf-8').toString("base64");

  const searchParams = new URLSearchParams({ orderId: '12345' }); // 실제 orderId를 동적으로 설정

  const url = `https://api.tosspayments.com/v1/payments/orders${searchParams.toString()}`;
  const payments = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type" : "application/json",
    },
  }).then((res) =>  res.json());

  // const {card} = payments;
  
  return (
    <>
    <div> 결제가 완료 되었습니다.</div>
    <ul>
      <li> 결제 상품 {payments.orderName}</li>
      <li> 주문번호 {payments.orderId}</li>
      <li> 카드회사 {payments.company}</li>
      <li> 카드번호 {payments.number}</li>
      <li> 결제금액 {payments.amount}</li>
      <li> 결제승인날짜 {Intl.DateTimeFormat().format(new Date())}</li>
    </ul>
    </>
  )
}
