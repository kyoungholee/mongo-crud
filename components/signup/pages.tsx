const SignUpPages: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">회원가입</h1>
        <form>
          {/* 여기에 회원가입 양식 필드들을 추가하세요 */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              사용자 이름
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="사용자 이름을 입력하세요."
            />
          </div>
          {/* 다른 양식 필드들도 유사하게 추가하세요 */}
          <div className="mb-6">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPages;
