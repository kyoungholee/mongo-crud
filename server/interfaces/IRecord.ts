// interface는 중복선언이 가능하기 때문에  잠재적인 에러를 만들 수 있습니다.
// type 사용을 추천합니다.

export type IRecord =  {
    // id : number;
    category : string;
    amount : string;
    description: string;
    userid:string;
    createDate: string;
    // updateDate: string

}