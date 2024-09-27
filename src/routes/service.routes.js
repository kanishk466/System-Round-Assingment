import express from 'express';
import { createService, getServicesInCategory, updateService, deleteService } from '../controllers/service.controller.js';
import  verifyToken  from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/category/:categoryId/service', verifyToken, createService);
router.get('/category/:categoryId/services', verifyToken, getServicesInCategory);
router.put('/category/:categoryId/service/:serviceId', verifyToken, updateService);
router.delete('/category/:categoryId/service/:serviceId', verifyToken, deleteService);

export default router;
