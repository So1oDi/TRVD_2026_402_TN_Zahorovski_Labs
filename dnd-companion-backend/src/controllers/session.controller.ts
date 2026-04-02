import { Request, Response } from 'express';
import { SessionService } from '../services/session.service';
import { CreateSessionDto, JoinSessionDto, SessionResponseDto } from '../dtos/session.dto';

export class SessionController {
    constructor(private sessionService: SessionService) { }

    /**
     * @swagger
     * /sessions:
     *   get:
     *     summary: Отримати всі сесії користувача (де DM або учасник)
     *     tags: [Sessions]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Об'єкт з масивами asDM та asPlayer
     */
    async getMySessions(req: Request, res: Response) {
        const userId = req.user!.id;
        const sessions = await this.sessionService.getUserSessions(userId);
        res.json({
            asDM: sessions.asDM.map(s => new SessionResponseDto(s)),
            asPlayer: sessions.asParticipant.map(s => new SessionResponseDto(s)),
        });
    }

    /**
     * @swagger
     * /sessions/{id}:
     *   get:
     *     summary: Отримати сесію за ID
     *     tags: [Sessions]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Дані сесії
     */
    async getSessionById(req: Request, res: Response) {
        const id = req.params.id as string;
        const userId = req.user!.id;
        const session = await this.sessionService.getSessionById(id, userId);
        res.json(new SessionResponseDto(session));
    }

    /**
     * @swagger
     * /sessions:
     *   post:
     *     summary: Створити нову сесію (DM)
     *     tags: [Sessions]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [name]
     *             properties:
     *               name:
     *                 type: string
     *     responses:
     *       201:
     *         description: Створена сесія з invite_code
     */
    async createSession(req: Request, res: Response) {
        const userId = req.user!.id;
        const dto = req.body as CreateSessionDto;
        const session = await this.sessionService.createSession(userId, dto);
        res.status(201).json(new SessionResponseDto(session));
    }

    /**
     * @swagger
     * /sessions/join:
     *   post:
     *     summary: Приєднатися до сесії за інвайт-кодом
     *     tags: [Sessions]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [invite_code]
     *             properties:
     *               invite_code:
     *                 type: string
     *     responses:
     *       200:
     *         description: Сесія, до якої приєднались
     */
    async joinSession(req: Request, res: Response) {
        const userId = req.user!.id;
        const dto = req.body as JoinSessionDto;
        const session = await this.sessionService.joinSession(userId, dto);
        res.json(new SessionResponseDto(session));
    }

    /**
     * @swagger
     * /sessions/{id}/leave:
     *   post:
     *     summary: Покинути сесію (не DM)
     *     tags: [Sessions]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Успішно покинуто
     */
    async leaveSession(req: Request, res: Response) {
        const id = req.params.id as string;
        const userId = req.user!.id;
        await this.sessionService.leaveSession(id, userId);
        res.status(204).send();
    }

    /**
     * @swagger
     * /sessions/{id}/close:
     *   delete:
     *     summary: Закрити сесію (тільки DM)
     *     tags: [Sessions]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Сесію закрито (is_active = false)
     */
    async closeSession(req: Request, res: Response) {
        const id = req.params.id as string;
        const userId = req.user!.id;
        const session = await this.sessionService.closeSession(id, userId);
        res.json(new SessionResponseDto(session));
    }

    /**
     * @swagger
     * /sessions/{id}/characters:
     *   get:
     *     summary: Отримати всіх персонажів у сесії
     *     tags: [Sessions]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Список персонажів сесії
     */
    async getSessionCharacters(req: Request, res: Response) {
        const id = req.params.id as string;
        const userId = req.user!.id;
        const characters = await this.sessionService.getSessionCharacters(id, userId);
        res.json(characters);
    }
}