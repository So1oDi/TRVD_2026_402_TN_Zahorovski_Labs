import prisma from '../config/prisma';
import { Spell, Prisma } from '@prisma/client';

export class SpellRepository {
    async findAll(includeHomebrew: boolean = true, userId?: string): Promise<Spell[]> {
        return prisma.spell.findMany({
            where: includeHomebrew ? {} : { is_homebrew: false },
            orderBy: { name: 'asc' },
        });
    }

    async findById(id: string): Promise<Spell | null> {
        return prisma.spell.findUnique({ where: { id } });
    }

    async create(data: Prisma.SpellCreateInput): Promise<Spell> {
        return prisma.spell.create({ data });
    }

    async update(id: string, data: Prisma.SpellUpdateInput): Promise<Spell> {
        return prisma.spell.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Spell> {
        return prisma.spell.delete({ where: { id } });
    }
}