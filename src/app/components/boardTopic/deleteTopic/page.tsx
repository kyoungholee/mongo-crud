'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const deleteBoardData = async (id: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteBoards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export default function Page({ id } : any) {
  const router = useRouter();

  const mutation = useMutation(() => deleteBoardData(id), {
    onSuccess: () => {
      alert('정말로 삭제 하시겠습니까?');
      router.refresh();
    },
    onError: () => {
      console.log('게시판 삭제 api 확인 해보세요.');
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="px-4 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
      disabled={mutation.isLoading}
    >
      {mutation.isLoading ? '삭제 중...' : '삭제'}
    </button>
  );
}
