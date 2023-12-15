type DEFAULT_HTTP_STATUS_MESSAGES = {
    400: string;
    401: string;
    403: string;
    404: string;
    409: string;
    500: string;
    503: string;
    [key: number]: string; // 'number' 타입에 대한 인덱스 시그니처 추가
  };

//interface 이용해 Error 객체에 statusCode key 추가
export interface ErrorWithStatusCode extends Error {
    statusCode? : number
};

const errorGenerator = ({ msg='', statusCode=500}: { msg?: string, statusCode: number }): void => {
    //인자로 들어오는 메세지와 상태 코드를 매핑
    const err: ErrorWithStatusCode = new Error(msg || DEFAULT_HTTP_STATUS_MESSAGES[statusCode]);
    err.statusCode = statusCode;
    throw err;
}

export default errorGenerator;