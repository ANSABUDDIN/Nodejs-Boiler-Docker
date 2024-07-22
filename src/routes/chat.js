import express from 'express';
import chatController from '../controllers/chat.controller.js';
const router = express.Router();


router.post('/login', chatController.chatAuth);
router.get('/messages', chatController.getSingleChatMessage);
router.post('/send-message', chatController.sendMessage);
router.get('/list', chatController.chatList);
router.post('/read-message', chatController.readMessages);

export default router;
