import { IUserInputDTO, userUniqueSearchInput } from "../../../server/interfaces/IUser";
import User from "../../../server/models/register";

const createUser = (data: IUserInputDTO) => {
    const user = new User(data);
    return user.save();
}

const findEmail = (data: userUniqueSearchInput) => {
    const { email } = data;
    return User.findOne({ email });
}
export default {
    createUser,
    findEmail
};