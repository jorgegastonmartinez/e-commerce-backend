import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/message.controller.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', isAuthenticated, isAdmin, getMessages);
router.post('/', isAuthenticated, createMessage);

export default router;