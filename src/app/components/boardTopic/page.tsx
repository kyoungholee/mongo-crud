import Link from 'next/link';
import axios from 'axios';




const BoardTopicPage = ({ boards } : any) => {

  console.log("boards", boards);
  const handleDelete = (id: number) => {
    // 삭제 로직 구현
  };

  return (
    <div className="container mx-auto mt-8">
      <div className='flex items-start justify-between'>
        <h1 className="mb-4 text-3xl font-bold">게시글 목록</h1>
        <Link href={'/components/boardCreate'}>
          게시글 생성
        </Link>
      </div>
      {/* <ul className="divide-y divide-gray-200">
        {boards.map(board => (
          <li key={board.id} className="py-4">
            <Link href={`/boards/${board.id}`}>
              {board.title}
            </Link>
            <p className="text-gray-500">{board.content}</p>
            <div className="mt-2">
              <button onClick={() => handleDelete(board.id)} className="px-4 py-1 mr-2 text-white bg-red-500 rounded hover:bg-red-600">삭제</button>
              <Link href={`/boards/${board.id}/edit`}>
                수정
              </Link>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};
export const generateMetatdata = async (contex : any) => {
  try {
    // 게시판 데이터를 가져오기
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/boards`);
    const boards = response.data;

    // 가져온 데이터를 props로 전달
    return { 
      props: {
        boards
      } 
    };
  } catch (error) {
    console.error('Failed to fetch boards:', error);
    return { props: { boards: [] } };
  }
}

export default BoardTopicPage;
