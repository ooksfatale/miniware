import express              from 'express';
import { body }             from 'express-validator';
import * as userController  from '../controllers/users.js'
import { validate }         from '../middleware/validate.js'
import { isAuth }           from '../middleware/auth.js';
import 'express-async-errors';

const router = express.Router();
const validateSignin = [
    body('user_id')
    .trim()
    .notEmpty()
    .withMessage('아이디를 입력하세요.'),
    body('user_pw')
    .trim()
    .isLength({min : 5})
    .withMessage('패스워드 5이상'),
    validate,
];
const validateSignup = [
    ...validateSignin,
    body('user_nm').notEmpty().withMessage('필수 정보 입니다.'),
    body('user_email').isEmail().normalizeEmail().withMessage('올바른 이메일 주소를 넣으세요'),
    validate,
];

// 회원가입
router.post('/signup', validateSignup, userController.signup);
// 로그인
router.post('/signin', validateSignin, userController.signin);
// 토큰검증
router.get('/auth', isAuth, userController.auth);

export default router;