import express              from 'express';
import 'express-async-errors';

const router = express.Router();

// 메모 목록
router.get('/', (req,res)=>{
    res.render('chat/chat');
});

export default router;