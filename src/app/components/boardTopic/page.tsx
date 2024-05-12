import Link from 'next/link';


const BoardTopicPage = async () => {

  let setBoardData = [];
  try {
    const getBoardData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, {
      cache: 'no-store',
    });
    const resultData = await getBoardData.json();


    const getResultData = resultData.topics;

    console.log(getResultData);
    setBoardData = getResultData;

  }catch(err) {
    console.log("api 를 확인해주세요.")
  }


  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-start justify-between">
        <h1 className="mb-4 text-3xl font-bold">게시글 목록</h1>
        <Link href="/components/boardCreate">게시글 생성</Link>
      </div>
        <ul className="divide-y divide-gray-200">
          {setBoardData?.map((board: any) => ( // 이 부분에서 에러가 발생할 수 있습니다.
            <li key={board._id} className="py-4">
              <Link href={`/boards/${board._id}`}>{board.title}</Link>
              <p className="text-gray-500">{board.content}</p>
              <div className="mt-2">
                {/* <button
                  onClick={() => handleDelete(board._id)}
                  className="px-4 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  삭제
                </button> */}
                <Link href={`/boards/${board._id}/edit`}>수정</Link>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
};

// { next: { revalidate: 10 } } - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사)

export default BoardTopicPage;
