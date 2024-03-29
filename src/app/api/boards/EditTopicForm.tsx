"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface iEditForm {
    id : number;
    title : string;
    description : string;
}

//  이 컨포넌트에서 api 작업을 진행해준다.

export default function EditTopicForm({ id, title, description } : iEditForm) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    //업데이트를 할 수 있는 구문
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="px-8 py-2 border border-slate-500"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="px-8 py-2 border border-slate-500"
        type="text"
        placeholder="Topic Description"
      />

      <button className="px-6 py-3 font-bold text-white bg-green-600 w-fit">
        Update Topic
      </button>
    </form>
  );
}