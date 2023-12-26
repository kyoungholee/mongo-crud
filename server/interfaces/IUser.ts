export interface IUser{
    id: string;
    password: string;
    checkpassword : string;
    email: string;
    // avatar: string;
    // date: Date;
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    date?: Date;
}

export interface userUniqueSearchInput {
    email : string;
}
