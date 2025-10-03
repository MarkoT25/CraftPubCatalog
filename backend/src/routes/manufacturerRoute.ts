import express from 'express';
import { adminMiddleware, protectRoute } from '../middleware/auth.middleware';
import { createManufacturer, deleteManufacturer, getManufacturerById, listManufacturers, updateManufacturer } from '../controllers/manufacturer.controller';

const router = express.Router();

router.get('/', protectRoute, listManufacturers);

router.get('/:id', protectRoute, getManufacturerById);

router.post('/create', protectRoute, adminMiddleware, createManufacturer);

router.put('/update/:id', protectRoute, adminMiddleware, updateManufacturer);

router.delete('/delete/:id', protectRoute, adminMiddleware, deleteManufacturer);

export default router;