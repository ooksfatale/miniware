import express              from 'express';
import { body }             from 'express-validator';
import * as userController  from '../controllers/usersController.js'
import { validate }         from '../middleware/validate.js'
import { isAuth }           from '../middleware/auth.js';
import 'express-async-errors';

const router = express.Router();
const validateSignin = [
    body('userEmail')
    .isEmail()
    .normalizeEmail()
    .withMessage('올바른 이메일 형식을 입력해주세요.'),
    body('userPw')
    .trim()
    .isLength({min : 6})
    .withMessage('비밀번호가 일치하지 않습니다.'),
    validate,
];
const validateSignup = [
    ...validateSignin,
    body('userNm').notEmpty().withMessage('필수 정보 입니다.'),
    validate,
];


router.get('/login',(req,res)=>{
    res.render('users/login',{layout:false});
});

// 회원가입
router.post('/signup', validateSignup, userController.signup);
// 로그인
router.post('/signin', validateSignin, userController.signin);
// 토큰검증
router.get('/auth', isAuth, userController.auth);

export default router;