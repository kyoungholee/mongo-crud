'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const BoardTopicPage = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 게시글 제목", content: "게시글 내용 요약..." },
    // 추가적인 게시글을 필요한 만큼 추가할 수 있습니다.
  ]);

  const handleDelete = (id :number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <div className="container mx-auto mt-8">
        <div className='flex items-start justify-between'>
            <h1 className="mb-4 text-3xl font-bold">게시글 목록</h1>
            <button>게시글 생성</button>
        </div>
      <ul className="divide-y divide-gray-200">
        {posts.map(post => (
          <li key={post.id} className="py-4">
            <Link href={`/posts/${post.id}`}>
            {post.title}
            </Link>
            <p className="text-gray-500">{post.content}</p>
            <div className="mt-2">
              <button onClick={() => handleDelete(post.id)} className="px-4 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600">삭제</button>
              <Link href={`/posts/${post.id}/edit`}>
               수정
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardTopicPage;
