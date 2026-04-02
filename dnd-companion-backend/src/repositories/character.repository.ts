import prisma from '../config/prisma';
import { Character, Prisma } from '@prisma/client';

export class CharacterRepository {
    async findById(id: string): Promise<Character | null> {
        return prisma.character.findUnique({
            where: { id },
            include: {
                race: true,
                class: true,
                characterSpells: { include: { spell: true } },
                characterItems: { include: { item: true } },
            },
        });
    }

    async findByUser(userId: string): Promise<Character[]> {
        return prisma.character.findMany({
            where: { user_id: userId },
            include: { race: true, class: true },
        });
    }

    async findBySession(sessionId: string): Promise<Character[]> {
        return prisma.character.findMany({
            where: { session_id: sessionId },
            include: { user: true, race: true, class: true },
        });
    }

    async create(data: Prisma.CharacterCreateInput): Promise<Character> {
        return prisma.character.create({ data });
    }

    async update(id: string, data: Prisma.CharacterUpdateInput): Promise<Character> {
        return prisma.character.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Character> {
        return prisma.character.delete({ where: { id } });
    }

    async addSpell(characterId: string, spellId: string, isPrepared: boolean = false) {
        return prisma.characterSpell.create({
            data: { character_id: characterId, spell_id: spellId, is_prepared: isPrepared },
        });
    }

    async removeSpell(characterId: string, spellId: string) {
        return prisma.characterSpell.delete({
            where: { character_id_spell_id: { character_id: characterId, spell_id: spellId } },
        });
    }
}