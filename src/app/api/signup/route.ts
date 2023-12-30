
import bcrypt from "bcrypt";

import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import errorGenerator from "../../errors/errorGenerator";
import gravatar from 'gravatar';
import { check, validationResult } from "express-validator";
import { IUserInputDTO } from "../../../../server/interfaces/IUser"
import { createUser, findEmail } from '../../services/pages'
import { nextTick } from "process";
import * as dotenv from "dotenv";
import connectMongoDB from "../../../../server/libs/mongodb";
import Register from "../../../../server/models/register";
import { NextResponse } from "next/server";

import { CookieOptions } from "express"; // 추가



// 가입하기 버튼을 눌르 시 , post요청을 실행해  몽고 디비에 데이터가 저장됌 , 
// 이제 이 데이터를 비밀번호를 먼저 해쉬로 암호화한다.
export async function POST(request : any, res : Response) {
    const {name, password, email} = await request.json();

    const YOUR_SECRET_KEY : any = process.env.SECRET_KEY;

    const mongoose = require('mongoose');
    const objectId = new mongoose.Types.ObjectId();

    try{

        const errors = validationResult(request.body);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        // const foundUser = await findEmail({ email });
        // if(foundUser)   errorGenerator({ statusCode: 409 });  // 이미 가입한 유저

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const payload = {
            user: {
                email: email,
            },
        };
       // 토큰 생성
    //    jwt.sign(
    //     payload,
    //     YOUR_SECRET_KEY,
    //     { expiresIn: "30m" },
    //     (err, token) => {
    //         if (err) {
    //             console.error("토큰 생성 에러:", err);
    //             res.status(500).json({ message: "토큰 생성 중 오류 발생" });
    //         } else {
    //             console.log("생성된 토큰:", token);
    //             res.cookie('userjj', token, { maxAge: 30 * 60 * 1000
              
    //         });
    //             res.end();
    //         }
    //     });

    // 토큰 생성
    jwt.sign(
        payload,
        YOUR_SECRET_KEY,
        { expiresIn: "30m" },
        (err, token) => {
          if (err) {
            console.error("토큰 생성 에러:", err);
            res.status(500).json({ message: "토큰 생성 중 오류 발생" });
          } else {
            console.log("생성된 토큰:", token);

            if(token) {
                localStorage.setItem('userjdwdj', token);

            }
            // 쿠키 대신 로컬 스토리지에 토큰 저장
            // 주의: 로컬 스토리지는 보안상의 이유로 인해 쿠키보다 안전하지 않을 수 있습니다.
      
            res.end();
          }
        }
      );
      



      

    await connectMongoDB();
    await Register.create({name, password: hashedPassword, email });
    return NextResponse.json({message: "회원가입 축하합니다."}, {status : 201})

    }catch(err){
        console.error("해당 부분 오류 입니다.")
    }

}