import { IUserInputDTO, userUniqueSearchInput } from "../../../server/interfaces/IUser";
import User from "../../../server/models/register";

export const createUser = (data: IUserInputDTO) => {
    const user = new User(data);
    return user.save();
}

export const findEmail = (data: userUniqueSearchInput) => {
    const { email } = data;
    return User.findOne({ email });
}
