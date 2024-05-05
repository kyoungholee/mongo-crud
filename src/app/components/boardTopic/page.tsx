import React from 'react';
import Link from 'next/link';

const PostsPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">게시글 목록</h1>
      <ul className="divide-y divide-gray-200">
        <li className="py-4">
          <Link href="/posts/1">
       첫 번째 게시글 제목
          </Link>
          <p className="text-gray-500">게시글 내용 요약...</p>
        </li>
       
      </ul>
    </div>
  );
};

export default PostsPage;
