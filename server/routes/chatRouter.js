import express              from 'express';
import * as chatController  from '../controllers/chatController.js';
import 'express-async-errors';

const router = express.Router();


router.get('/', chatController.chat);


export default router;