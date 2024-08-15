import express from 'express';
import { getAll, store } from '../controllers/messageController.js';
import authMiddleware from '../middleare/authMiddleware.js'

const router = express.Router();

router.get('/getAll', authMiddleware, getAll);
router.post('/store', authMiddleware, store);

export default router;