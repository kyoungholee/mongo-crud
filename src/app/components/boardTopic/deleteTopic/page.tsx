'use client'
import React from 'react'

export default function Page({id} :any) {

  const handleDelete = async (id: string) => {
    console.log("id", id);

    try {
      const deleteBoardData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteBoards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return deleteBoardData;
      // const resultDeleteData = await deleteBoardData.json();
      // console.log(resultDeleteData);
    } catch (err) {
      console.log("게시판 삭제 api 확인 해보세요.");
    }
  };

  const _id = "some_id"; // 실제 ID를 이 부분에 넣어야 합니다.

  return (
    <button
      onClick={() => handleDelete(id)}
      className="px-4 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
    >
      삭제
    </button>
  );
}
