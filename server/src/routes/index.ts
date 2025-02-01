import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Apply authentication middleware to all API routes
router.use('/auth', authRoutes); // No authentication needed for auth routes
router.use('/api', authenticateToken, apiRoutes); // Add authentication to the API routes

export default router;

