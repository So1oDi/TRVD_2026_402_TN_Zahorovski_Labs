import prisma from '../config/prisma';
import { Session, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export class SessionRepository {
    async findById(id: string): Promise<(Session & { dm: any; participants: any[]; characters: any[] }) | null> {
        return prisma.session.findUnique({
            where: { id },
            include: { dm: true, participants: { include: { user: true } }, characters: true },
        });
    }

    async findByInviteCode(code: string): Promise<Session | null> {
        return prisma.session.findUnique({ where: { invite_code: code } });
    }

    async findByDM(dmId: string): Promise<Session[]> {
        return prisma.session.findMany({ where: { dm_id: dmId } });
    }

    async create(data: Omit<Prisma.SessionCreateInput, 'invite_code'>): Promise<Session> {
        const inviteCode = uuidv4().slice(0, 8);
        return prisma.session.create({
            data: {
                ...data,
                invite_code: inviteCode,
            },
        });
    }

    async update(id: string, data: Prisma.SessionUpdateInput): Promise<Session> {
        return prisma.session.update({ where: { id }, data });
    }

    async addParticipant(sessionId: string, userId: string) {
        return prisma.sessionParticipant.create({
            data: { session_id: sessionId, user_id: userId },
        });
    }

    async removeParticipant(sessionId: string, userId: string) {
        return prisma.sessionParticipant.delete({
            where: { session_id_user_id: { session_id: sessionId, user_id: userId } },
        });
    }
}