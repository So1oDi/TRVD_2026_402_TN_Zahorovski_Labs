import { Router } from 'express';
import authRoutes from './auth.routes';
import characterRoutes from './character.routes';
import sessionRoutes from './session.routes';
import homebrewRoutes from './homebrew.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/characters', characterRoutes);
router.use('/sessions', sessionRoutes);
router.use('/homebrew', homebrewRoutes);

export default router;