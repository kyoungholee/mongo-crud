"use client";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { useEffect, useState } from "react"; // 추가
// import { HiPencilAlt } from "react-icons/hi";

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
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
