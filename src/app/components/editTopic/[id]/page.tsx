import EditTopicForm from "../../../api/boards/EditTopicForm";
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


export default async function EditTopic({ params }: Iparams) {
  const { id} : any = params;
  const { topic } = await getTopicById();
  const { title, description } = topic;
  
  
  //업데이트 할 것!! 그것을 골랐다면, 수정한 후 업데이터 버튼을 누르게 되면 밑에 있는 return 값대로 반환 합니다.
  return <EditTopicForm id={id} title={title} description={description} />;
}