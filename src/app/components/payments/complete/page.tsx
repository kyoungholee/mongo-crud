import React from 'react'

export default function PayCompletePage() {
  const secretKey = process.env.NEXT_PUBLIC_CLIENT_TOSS_SECRET_KEY  || "";
  const basicToken = Buffer.from(`${secretKey};`, 'utf-8').toString("base64");
  return (
    <div>결제가 완료 되면 완료 되었다가 나타내주는 페이지는

      이름 , 가격, 카드번호, 승인인증 ? , 몇개를 샀는지.. 
    </div>
  )
}
