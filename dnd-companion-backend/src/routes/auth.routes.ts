import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authService } from '../config/di';
import { validateDto } from '../middlewares/validation.middleware';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new AuthController(authService);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентифікація
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, display_name]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               display_name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [player, dm, admin]
 *     responses:
 *       201:
 *         description: Успішна реєстрація
 */
router.post('/register', validateDto(RegisterDto), controller.register.bind(controller));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вхід користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний вхід, повертає JWT
 */
router.post('/login', validateDto(LoginDto), controller.login.bind(controller));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Отримати інформацію про поточного користувача
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Дані користувача
 */
router.get('/me', authMiddleware, controller.getMe.bind(controller));

export default router;