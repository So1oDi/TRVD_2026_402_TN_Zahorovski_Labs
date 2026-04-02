import prisma from '../config/prisma';
import { Class, Prisma } from '@prisma/client';

export class ClassRepository {
    async findAll(includeHomebrew: boolean = true, userId?: string): Promise<Class[]> {
        return prisma.class.findMany({
            where: includeHomebrew ? {} : { is_homebrew: false },
            orderBy: { name: 'asc' },
        });
    }

    async findById(id: string): Promise<Class | null> {
        return prisma.class.findUnique({ where: { id } });
    }

    async create(data: Prisma.ClassCreateInput): Promise<Class> {
        return prisma.class.create({ data });
    }

    async update(id: string, data: Prisma.ClassUpdateInput): Promise<Class> {
        return prisma.class.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Class> {
        return prisma.class.delete({ where: { id } });
    }
}