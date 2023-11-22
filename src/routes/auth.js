import express from 'express';
import auth from '../controllers/auth.js';
const router = express.Router();


router.post('/login', auth.login);
router.get('/get', auth.get);
router.post('/register', auth.register);

export default router;
