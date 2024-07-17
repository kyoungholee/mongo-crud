// src/app/api/createpayment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const POST = async (req: NextRequest) => {
  try {
    const { amount, orderId, paymentKey} = await req.json();

    console.log("amount, orderId, orderName, customerName, customerEmail ", amount, orderId, paymentKey);

    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments',
      {
        amount,
        orderId,
        paymentKey,
        successUrl: `${process.env.NEXT_PUBLIC_HOST}/components/payments/complete`,
        failUrl: `${process.env.NEXT_PUBLIC_HOST}/fail`,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_TOSS_PAYMENTS_API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ success: true, paymentUrl: response.data.checkout.url });
  } catch (error) {
    console.error('결제 생성 실패:', error);
    return NextResponse.json({ success: false, message: '결제 생성 실패'}, { status: 500 });
  }
};


