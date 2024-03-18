"use client";

import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id } : any) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    //게시판 삭제 하는 구문 
    if (confirmed) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
       <HiOutlineTrash size={24} />
    </button>
  );
}