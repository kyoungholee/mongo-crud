import React, { useEffect, useState } from 'react';

// Base64 인코딩 함수
const toBase64 = (str: string): string => {
  return btoa(str);
};

export default function PayCompletePage() {
  const [payments, setPayments] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const clientKey = process.env.NEXT_PUBLIC_CLIENT_TOSS_PAYMONT_KEY|| "";
        const secretKey = process.env.NEXT_PUBLIC_CLIENT_TOSS_SECRET_KEY || "";
        const basicToken = toBase64(`${clientKey}:${secretKey}`);

        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('orderId');
        if (!orderId) {
          setError('Order ID가 URL에 없습니다.');
          return;
        }

        const url = `https://api.tosspayments.com/v1/payments/orders/${orderId}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('결제 정보를 가져오지 못했습니다.');
        }

        const data = await response.json();
        setPayments(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchPayments();
  }, []);

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!payments) {
    return <div>결제 정보를 로드 중입니다...</div>;
  }

  return (
    <>
      <div>결제가 완료 되었습니다.</div>
      <ul>
        <li>결제 상품: {payments.orderName}</li>
        <li>주문번호: {payments.orderId}</li>
        <li>카드회사: {payments.card?.company}</li>
        <li>카드번호: {payments.card?.number}</li>
        <li>결제금액: ₩{payments.amount?.toLocaleString()}</li>
        <li>결제승인날짜: {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}</li>
      </ul>
    </>
  );
}
