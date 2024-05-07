'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  // const router = useRouter();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    // 게시판 생성 API 호출
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ title, content }),
    // });

    // if (response.ok) {
    //   // router.push('/posts');
    // }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">게시판 생성하기</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
          <input type="text" id="title" className="w-full p-2 mt-1 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
          <textarea id="content" rows={5} className="w-full p-2 mt-1 border rounded" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>

        <div>
          <div className="mb-4">
            <label htmlFor="writer" className="block text-sm font-medium text-gray-700">작성자</label>
            <input type="text" id="writer" className="p-2 mt-1 border rounded w-30" value={writer} onChange={(e) => setWriter(e.target.value)} required />
          </div>
          <div className="mb-4">
          <label htmlFor="writer" className="block text-sm font-medium text-gray-700">날짜</label>
          <input type="text" id="writer" className="p-2 mt-1 border rounded w-30" value={new Date().toLocaleDateString()} onChange={(e) => setWriter(e.target.value)} required />
          </div>
          <div className="mb-4">
            <button type="submit" className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">게시글 생성</button>
            <button type="button" className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300">취소</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPostPage;
