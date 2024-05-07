import React from 'react';
interface Iparams {
    params : string;
}
//이 코드가 먼저 발생합니다. 
// 이유는 ==> 동적으로 id에 값을 불러와 어떠한 게시판을 클릭해준지 알려준다.


 const getTopicById = async ()=> {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
