'use client';

import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, FormEvent, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface Topic {
  _id: string;
  title: string;
  content: string;
  writer: string;
  day: string;
  comments: Comment[];
}

interface Comment {
  content: string;
  writer: string;
  day: string;
}

const BoardDetailPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [day, setDay] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState('');

  const { id } = useParams();
  const router = useRouter();
  
  const answeruser = getCookie('userId');
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery('detail', () =>
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/boards`).then((res) => res.data)
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/commentApi`);
      const data = await response.json();
      const comments = data.comments;
      setComments(comments);

      console.log("useEffect fetchData", comments );
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, []);

  const addCommentMutation = useMutation(
    (newComment: Comment) => 
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/commentApi`, newComment, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: (response) => {
        // 댓글이 성공적으로 추가된 후 데이터 다시 가져오기
        fetchData();
        setCommentContent(''); // 입력 필드 초기화
      },
      onError: (error) => {
        console.error('Failed to add comment:', error);
      },
    }
  );

  useEffect(() => {
    fetchData(); // 데이터를 가져오는 함수 호출
  
    if (data && data.topics) {
      const topic = data.topics.find((item: Topic) => item._id === id);
      if (topic) {
        setTitle(topic.title);
        setContent(topic.content);
        setWriter(topic.writer);
        setDay(topic.day);
        setComments(topic.comments);
      } else {
        console.error('Topic not found');
        router.push('/components/boardTopic'); // 주제가 없으면 다른 페이지로 리디렉션
      }
    }
  }, [data, id, router, fetchData]);

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment: Comment = {
      content: commentContent,
      writer: answeruser || 'Anonymous', // 로그인 기능이 있다면 사용자 정보를 넣을 수 있습니다.
      day: new Date().toLocaleDateString(),
    };

    addCommentMutation.mutate(newComment);
  };

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
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-gray-700">{comment.content}</p>
              <div className="text-sm text-gray-500">작성자: {comment.writer} | 작성일: {comment.day}</div>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="댓글을 입력하세요"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            댓글 달기
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoardDetailPage;
