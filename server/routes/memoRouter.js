import express              from 'express';
import { body }             from 'express-validator';
import * as memoController  from '../controllers/memoController.js';
import { validate }         from '../middleware/validate.js'
import { isAuth }           from '../middleware/auth.js';
import 'express-async-errors';

const router = express.Router();
const validateMemo = [
    body('memoContent')
    .isLength({min : 2, max: 3000 })
    .withMessage('두글자 이상 내용을 입력해주세요'),
    validate,
];

// 메모 목록
router.get('/', isAuth, memoController.list);
// 메모 저장
router.post('/',isAuth,validateMemo, memoController.create);
// 메모 상세보기
router.get('/:memoId',isAuth, memoController.detail);
// 메모 수정
router.put('/:memoId',isAuth, memoController.update);
// 메모 삭제
router.delete('/:memoId',isAuth, memoController.remove);

export default router;