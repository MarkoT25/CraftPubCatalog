import express from 'express';
import { adminMiddleware, protectRoute } from '../middleware/auth.middleware';
import { createBeer, deleteBeer, getBeerById, listBeers, updateBeer } from '../controllers/beer.controller';

const router = express.Router();

router.get('/', protectRoute, listBeers);

router.get('/:id', protectRoute, getBeerById);

router.post('/create', protectRoute, adminMiddleware, createBeer);

router.put('/update/:id', protectRoute, adminMiddleware, updateBeer);

router.delete('/delete/:id', protectRoute, adminMiddleware, deleteBeer);

export default router;