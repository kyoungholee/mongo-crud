"use client";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { useEffect, useState } from "react"; // 추가
import { HiPencilAlt } from "react-icons/hi";

interface Topic {
  _id: string;
  title: string;
  description: string;
}

export default function TopicsList() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          //리스트를 조회하는 게시판을 보여주는 컴포넌트
          try {
            const res = await fetch("http://localhost:3000/api/topics", {
              cache: "no-store",
            });
    
            if (!res.ok) {
              throw new Error("Failed to fetch topics");
            }
    
            const data: { topics: Topic[] } = await res.json();
            setTopics(data.topics);
            console.log(data);
          } catch (error) {
            console.error("Error loading topics: ", error);
            // 에러 처리 로직 추가
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }

  return (
    <>
      {topics.map((t: Topic) => (
        <div
          key={t._id}
          className="flex items-start justify-between gap-5 p-4 my-3 border border-slate-300"
        >
          <div>
            <h2 className="text-2xl font-bold">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/components/editTopic/${t._id}`}>
            <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
