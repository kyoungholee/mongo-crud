import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function PaymentCompletePage() {
  const router = useRouter();
  const [payments, setPayments] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENT_KEY || "";
        const secretKey = process.env.NEXT_PUBLIC_CLIENT_TOSS_SECRET_KEY || "";
        const basicToken = btoa(`${clientKey}:${secretKey}`);

        const orderId = router.query.orderId as string;
        const paymentKey = router.query.paymentKey as string;
        const amount = router.query.amount as string;
        if (!orderId) {
          setError('Order ID가 URL에 없습니다.');
          return;
        }

        const url = `https://api.tosspayments.com/v1/payments/orders/orderId=${orderId}&paymentKey=${orderId}&amount=${amount}`;

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

    if (router.isReady) {
      fetchPayments();
    }
  }, [router]);

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!payments) {
    return <div>결제 정보를 로드 중입니다...</div>;
  }

  return (
    <>
      <div>결제가 완료되었습니다.</div>
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
