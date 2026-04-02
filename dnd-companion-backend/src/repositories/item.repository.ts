import prisma from '../config/prisma';
import { Item, Prisma } from '@prisma/client';

export class ItemRepository {
    async findAll(includeHomebrew: boolean = true, userId?: string): Promise<Item[]> {
        return prisma.item.findMany({
            where: includeHomebrew ? {} : { is_homebrew: false },
            orderBy: { name: 'asc' },
        });
    }

    async findById(id: string): Promise<Item | null> {
        return prisma.item.findUnique({ where: { id } });
    }

    async create(data: Prisma.ItemCreateInput): Promise<Item> {
        return prisma.item.create({ data });
    }

    async update(id: string, data: Prisma.ItemUpdateInput): Promise<Item> {
        return prisma.item.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Item> {
        return prisma.item.delete({ where: { id } });
    }
}