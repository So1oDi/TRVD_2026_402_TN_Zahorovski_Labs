import prisma from '../config/prisma';
import { Race, Prisma } from '@prisma/client';

export class RaceRepository {
    async findAll(includeHomebrew: boolean = true, userId?: string): Promise<Race[]> {
        return prisma.race.findMany({
            where: includeHomebrew ? {} : { is_homebrew: false },
            orderBy: { name: 'asc' },
        });
    }

    async findById(id: string): Promise<Race | null> {
        return prisma.race.findUnique({ where: { id } });
    }

    async create(data: Prisma.RaceCreateInput): Promise<Race> {
        return prisma.race.create({ data });
    }

    async update(id: string, data: Prisma.RaceUpdateInput): Promise<Race> {
        return prisma.race.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Race> {
        return prisma.race.delete({ where: { id } });
    }
}