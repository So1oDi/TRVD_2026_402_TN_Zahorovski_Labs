import { SessionRepository } from '../repositories/session.repository';
import { CharacterRepository } from '../repositories/character.repository';
import { CreateSessionDto, JoinSessionDto } from '../dtos/session.dto';
import { ValidationError, NotFoundError, UnauthorizedError } from '../utils/errors';

export class SessionService {
    constructor(
        private sessionRepo: SessionRepository,
        private characterRepo: CharacterRepository
    ) { }

    async getSessionById(id: string, userId: string) {
        const session = await this.sessionRepo.findById(id);
        if (!session) throw new NotFoundError('Сесія не знайдена');
        const isParticipant = session.dm_id === userId || session.participants.some(p => p.user_id === userId);
        if (!isParticipant) throw new UnauthorizedError('Немає доступу до цієї сесії');
        return session;
    }

    async getUserSessions(userId: string) {
        const asDM = await this.sessionRepo.findByDM(userId);
        return { asDM, asParticipant: [] };
    }

    async createSession(userId: string, dto: CreateSessionDto) {
        const data = {
            name: dto.name,
            dm: { connect: { id: userId } }
        };
        return this.sessionRepo.create(data);
    }

    async joinSession(userId: string, dto: JoinSessionDto) {
        const session = await this.sessionRepo.findByInviteCode(dto.invite_code);
        if (!session) throw new NotFoundError('Невірний код запрошення');
        if (session.dm_id === userId) throw new ValidationError('DM не може приєднатись до власної сесії');

        await this.sessionRepo.addParticipant(session.id, userId);
        return session;
    }

    async leaveSession(sessionId: string, userId: string) {
        const session = await this.sessionRepo.findById(sessionId);
        if (!session) throw new NotFoundError('Сесія не знайдена');
        if (session.dm_id === userId) throw new ValidationError('DM не може покинути сесію, тільки закрити її');
        await this.sessionRepo.removeParticipant(sessionId, userId);
    }

    async closeSession(sessionId: string, userId: string) {
        const session = await this.sessionRepo.findById(sessionId);
        if (!session) throw new NotFoundError('Сесія не знайдена');
        if (session.dm_id !== userId) throw new UnauthorizedError('Тільки DM може закрити сесію');
        return this.sessionRepo.update(sessionId, { is_active: false });
    }

    async getSessionCharacters(sessionId: string, userId: string) {
        const session = await this.sessionRepo.findById(sessionId);
        if (!session) throw new NotFoundError('Сесія не знайдена');
        const isParticipant = session.dm_id === userId || session.participants.some(p => p.user_id === userId);
        if (!isParticipant) throw new UnauthorizedError('Немає доступу');
        return this.characterRepo.findBySession(sessionId);
    }
}