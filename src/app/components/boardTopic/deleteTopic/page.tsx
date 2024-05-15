'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Page({id} :any, {onDelete} : any) {

 const router = useRouter();


  const handleDelete = async (id: string) => {
    console.log("id", id);

    try {
      const deleteBoardData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteBoards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
   
      router.refresh();
      
      // console.log(resultDeleteData);
    } catch (err) {
      console.log("게시판 삭제 api 확인 해보세요.");
    }
  
  };
  return (
    <button
      onClick={() => handleDelete(id)}
      className="px-4 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
    >
      삭제
    </button>
  );
}
