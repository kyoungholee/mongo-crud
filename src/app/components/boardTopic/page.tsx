import Link from 'next/link';
import axios from 'axios';


const BoardTopicPage = async (context: any) => {

  try {
    // 게시판 데이터를 가져오기
    const getBoardData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, {
      cache: 'no-store',
    });
    const resultData = await getBoardData.json();

    console.log("generateMetadata", resultData.topics);

    const result = resultData.topics;

    // 가져온 데이터를 props로 전달
    return result;


  } catch (error) {
    console.error('Failed to fetch boards:', error);
    // 오류가 발생한 경우 빈 배열을 반환합니다.
    return {
      props: {
        resultData: [],
      },
    };
  }


  const handleDelete = (id: number) => {
    // 삭제 로직 구현
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-start justify-between">
        <h1 className="mb-4 text-3xl font-bold">게시글 목록</h1>
        <Link href="/components/boardCreate">게시글 생성</Link>
      </div>
      {/* <ul className="divide-y divide-gray-200">
        {getBoardData.map((board: any) => (
          <li key={board._id} className="py-4">
            <Link href={`/boards/${board._id}`}>{board.title}</Link>
            <p className="text-gray-500">{board.content}</p>
            <div className="mt-2">
              <button
                onClick={() => handleDelete(board._id)}
                className="px-4 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                삭제
              </button>
              <Link href={`/boards/${board._id}/edit`}>수정</Link>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};



// { next: { revalidate: 10 } } - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사)


export default BoardTopicPage;
