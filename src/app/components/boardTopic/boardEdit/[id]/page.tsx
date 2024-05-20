'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from "next/navigation";


const BoardEdit: React.FC =  () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [day, setDay] = useState('');
  const router = useRouter();

  const urlParam = useParams();


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`,{
      method: 'GET',
    }).then(res => res.json())
    .then((data)  => {
     data.topics.filter((item  : any)=> {
        if(item._id === urlParam.id) {
          setTitle(item.title);
          setContent(item.content);
          setWriter(item.writer);
        }
      });
    });
  },[])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/boards`, {
        urlParam,
        title,
        content,
        writer,
        day: new Date().toLocaleDateString()
      });


      if (response.status === 201) {
      console.log("데이터 업데이트 !!!!! 전송 성공  ", response.data);
        router.push('/components/boardTopic'); // 성공 시 게시판 목록 페이지로 이동
      } else {
        console.error('Failed to create post:', response.data);
        // 실패 시 예외 처리
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      // 실패 시 예외 처리
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">게시판 수정하기</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
          <input type="text" id="title" className="w-full p-2 mt-1 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
          <textarea id="content" rows={5} className="w-full p-2 mt-1 border rounded" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="writer" className="block text-sm font-medium text-gray-700">작성자</label>
          <input type="text" id="writer" className="w-full p-2 mt-1 border rounded" value={writer} onChange={(e) => setWriter(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="day" className="block text-sm font-medium text-gray-700">날짜</label>
          <input type="text" id="day" className="w-full p-2 mt-1 border rounded" value={new Date().toLocaleDateString()} onChange={(e) => setDay(e.target.value)} required />
        </div>
        <div className="mb-4">
          <button type="submit" className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">게시글 수정</button>
          <button type="button" className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300">취소</button>
        </div>
      </form>
    </div>
  );
};

export default BoardEdit;
