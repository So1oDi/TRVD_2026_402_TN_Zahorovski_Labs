import { Router } from 'express';
import { SessionController } from '../controllers/session.controller';
import { sessionService } from '../config/di';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDto } from '../middlewares/validation.middleware';
import { CreateSessionDto, JoinSessionDto } from '../dtos/session.dto';

const router = Router();
const controller = new SessionController(sessionService);

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Управління ігровими сесіями
 */

router.get('/', controller.getMySessions.bind(controller));
router.get('/:id', controller.getSessionById.bind(controller));
router.get('/:id/characters', controller.getSessionCharacters.bind(controller));
router.post('/', validateDto(CreateSessionDto), controller.createSession.bind(controller));
router.post('/join', validateDto(JoinSessionDto), controller.joinSession.bind(controller));
router.post('/:id/leave', controller.leaveSession.bind(controller));
router.delete('/:id/close', controller.closeSession.bind(controller));

export default router;