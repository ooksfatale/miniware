import jwt              from 'jsonwebtoken';
import { config }       from '../config.js';
import * as userModel   from '../models/usersModel.js';


//jwt 토큰 생성
export const accessToken = (userId, userEmail) => {
    return jwt.sign({ userId, userEmail }, config.jwt.secretKey,{
        expiresIn: config.jwt.expiresInSec,
    });
};

//jwt 토큰 갱신
export const refreshToken = (userId, userEmail) => {
    return jwt.sign({userId, userEmail}, config.jwt.refreshSecretKey,{
        expiresIn: config.jwt.refreshSecretKey,
    });
};


//jwt 토큰 검증
export const isAuth = async (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        req.decoded = jwt.verify(token, config.jwt.secretKey);
        return next();
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            return res.status(419).json({message : '토큰이 만료되었습니다.'});
        };
        return res.status(401).json({message : '유효하지 않은 토큰입니다.'});
    };
};