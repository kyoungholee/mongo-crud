'use client';

import Link from 'next/link';
import DeletePageDaa from './deleteTopic/page'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

const BoardTopicPage = () => {
  const [boardData, setBoardData] = useState([]);
  const { data } = useQuery({
    queryKey: ['topic'],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/boards`).then((res: any) => res.data.topics),
  });

  useEffect(() => {
      setBoardData(data);
  }, [data]);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-start justify-between">
        <h1 className="mb-4 text-3xl font-bold">게시글 목록</h1>
        <Link href="/components/boardCreate">게시글 생성</Link>
      </div>
        <ul className="divide-y divide-gray-200">
          {boardData?.map((board: any, index : number) => ( // 이 부분에서 에러가 발생할 수 있습니다.
            <li key={board._id} className="py-4">
              <Link href={`/boards/${board._id}`}>{board.title}</Link>
              <p className="text-gray-500">{board.content}</p>
              <div className="mt-2">
                  <DeletePageDaa id={board._id}/>
                <Link href={`/components/boardTopic/boardEdit/${board._id}`}>수정</Link>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
};

// { next: { revalidate: 10 } } - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사)

export default BoardTopicPage;
