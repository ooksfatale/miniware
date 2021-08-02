import bcrypt           from 'bcrypt';
import * as userModel   from '../models/users.js';
import { config }       from '../config.js';
import { sign }         from '../middleware/auth.js';

import 'express-async-errors';

//회원가입
export async function signup(req,res){
    try{
        const { user_id, user_pw, user_nm, user_email } = req.body;
        const found = await userModel.findByUserId(user_id);
        if(found){
            return res.status(409).json({message : `${user_id}는 이미 사용중인 아이디입니다.`});
        }
        const hashed = await bcrypt.hash(user_pw, config.bcrypt.saltRounds);
        console.log('hashed : ',hashed);
        const userSno = await userModel.createUser({
            user_id,
            user_pw : hashed,
            user_nm,
            user_email
        });

        const token = sign(userSno);
        res.status(201).json({ token, user_id });
    }catch(err){
        console.log('err : ', err);
    }
};

//로그인
export async function signin(req,res){
    try{
        const {user_id, user_pw} = req.body;
        //user 조회
        const user = await userModel.findByUserId(user_id);
        if(!user){
            return res.status(401).json({ message : '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'});
        };

        //패스워드 체크
        const isValidPassword = await bcrypt.compare(user_pw, user.user_pw);
        if(!isValidPassword){
            return res.status(401).json({ message : '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'});
        };

        //아이디와 패스워드가 맞으면 jwt토큰 생성
        const token = sign(user.user_sno, user.user_id);
        console.log('token : ',token);
        res.status(200).json({ token, user_id });
        
    }catch(err){
        console.log('err : ', err);
    }
};

export async function auth(req,res,next){
    try{
        const { userSno } = req.decoded;
        const user = await userModel.findBySno(userSno);
        if(!user){
            return res.status(404).json({message : 'user not found'});
        };
        res.status(200).json({token : req.decoded});
    }catch(err){
        console.log('err : ',err);
    }
}