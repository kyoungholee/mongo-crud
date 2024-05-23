'use client';

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const BoardDetailPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [day, setDay] = useState('');

  const { id } = useParams();
  const router = useRouter();

  const { data, error, isLoading } = useQuery('detail', () =>
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/boards`).then((res) => res.data)
  );

  useEffect(() => {
    if (data && data.topics) {
      const topic = data.topics.find((item : any) => item._id === id);
      if (topic) {
        setTitle(topic.title);
        setContent(topic.content);
        setWriter(topic.writer);
        setDay(topic.day);
      } else {
        console.error('Topic not found');
        router.push('/components/boardTopic'); // Redirect to a different page if the topic is not found
      }
    }
  }, [data, id, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="container p-4 mx-auto mt-8">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-3xl font-bold">{title}</h1>
        <p className="mb-4 text-gray-700">{content}</p>
        <div className="text-sm text-gray-500">작성자: {writer} | 작성일: {day}</div>
      </div>

      <div className="p-6 mt-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">댓글</h2>
        {/* 댓글 부분은 현재 하드코딩된 값이므로 실제 댓글 데이터를 가져오는 로직을 추가할 수 있습니다 */}
        <div key={2} className="pt-4 mt-4 border-t border-gray-200">
          <p className="text-gray-700">{writer}</p>
          <div className="text-sm text-gray-500">작성일: {day}</div>
        </div>

        {/* 댓글 작성 폼 */}
        {/* <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="댓글을 입력하세요"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            댓글 달기
          </button>
        </form> */}
      </div>
    </div>
  );
}

export default BoardDetailPage;
