import express, { NextFunction, Request, Response } from 'express';
import { signUp, login, logout, retrieveProfile } from '../controllers/auth.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/sign-up', (req: Request, res: Response) => {
    signUp(req, res);
});

router.post('/login', (req: Request, res: Response) => {
    login(req, res);
});

router.post('/logout', (req: Request, res: Response) => {
    logout(req, res);
});

router.get('/check', protectRoute, retrieveProfile);


export default router;