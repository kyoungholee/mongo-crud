import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errorGenerator from "../../../errors/errorGenerator";
import gravatar from 'gravatar';
import { check, validationResult } from "express-validator";
import { IUserInputDTO } from "../../../../server/interfaces/IUser"
import { UserService } from "../../services/pages";
import { nextTick } from "process";
import * as dotenv from "dotenv";


const signUp = async (req: Request, res: Response, next: NextFunction) => {
    check("name", "Name is required").not().isEmpty();
    check("email", "Please include a valid email").isEmail();
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 });
    const { name, email, password } : IUserInputDTO = req.body;
    try{
        const errors = validationResult(req.body);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const foundUser = await UserService.findEmail({ email });
        if(foundUser)   errorGenerator({ statusCode: 409 });  // 이미 가입한 유저

        const avatar = gravatar.url(email, {
            s: "200",
            r: "pq",
            d: "mm",
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = await UserService.createUser({ name, email, password: hashedPassword, avatar: avatar });

        const payload = {
            user: {
                email: createdUser.email,
            },
        };
        jwt.sign(
            payload, // payload into jwt.sign method
            process.env.SECRET_KEY, // secret key value
            { expiresIn: "30m" }, // token expiration time
            (err, token) => {
                if (err) throw err;
                else {
                    return res
                    .cookie('user', token,{maxAge:30*60 * 1000}) // 1000 is a sec
                    .end();
                }
            });
    } catch (err) {
        next(err);
    }
};

// export default {
//     signUp,
//     logIn
// }