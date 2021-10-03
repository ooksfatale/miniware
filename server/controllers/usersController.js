import bcrypt           from 'bcrypt';
import * as userModel   from '../models/usersModel.js';
import { config }       from '../config.js';
import { accessToken, refreshToken }  from '../middleware/auth.js';
import 'express-async-errors';

//회원가입
export async function signup(req,res){
    try{
        const { userId, userPw, userNm, userEmail } = req.body;
        const found = await userModel.findByUserEmail(userEmail);
        if(found){
            return res.status(409).json({message : `${userEmail}는 이미 사용중인 아이디입니다.`});
        }
        const hashed = await bcrypt.hash(userPw, config.bcrypt.saltRounds);
        console.log('hashed : ',hashed);
        const userInfo = await userModel.createUser({
            userId,
            userPw : hashed,
            userNm,
            userEmail
        });

        const token = accessToken(userInfo);
        res.status(201).json({ token, userId });
    }catch(err){
        console.log('err : ', err);
    }
};

//로그인
export async function signin(req,res){
    try{
        const {userEmail, userPw} = req.body;
        //user 조회
        const user = await userModel.findByUserEmail(userEmail);
        if(!user){
            return res.status(401).json({ message : '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'});
        };

        const isValidPassword = await bcrypt.compare(userPw, user.userPw);
        if(!isValidPassword){
            return res.status(401).json({ message : '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'});
        };

        //아이디와 패스워드가 맞으면 jwt토큰 생성
        const token = accessToken(user.userId, user.userEmail);
        res.status(200).json({ token, userEmail });
        
    }catch(err){
        console.log('err : ', err);
    }
};

export async function auth(req,res,next){
    try{
        const { userId } = req.decoded;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message : 'user not found'});
        };
        res.status(200).json({token : req.decoded});
    }catch(err){
        console.log('err : ',err);
    }
}