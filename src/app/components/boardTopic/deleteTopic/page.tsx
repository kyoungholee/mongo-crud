'use client'
import React from 'react'

export default function page() {

    const handleDelete  =  async(_id : any) => {
        console.log("id", _id);
    
        try {
    
          const deleteBoardData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, {
            // cache: 'force-cache',
            // next: { revalidate: 10 },
            method : 'DELETE',
            headers : {
              'Content-Type': 'application/json',
            }
    
          });
          const resultDeleteData = await deleteBoardData.json();
    
          console.log(resultDeleteData);
    
          
          
        }catch(err) {
          console.log("게시판 삭제 api 확인 해보세요.")
        }
      };
  return (
    <button onClick={handleDelete}
    className="px-4 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
  >
    삭제
  </button>
  )
}
