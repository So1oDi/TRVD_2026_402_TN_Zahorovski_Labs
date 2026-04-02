import { CharacterRepository } from '../repositories/character.repository';
import { CreateCharacterDto, UpdateCharacterDto } from '../dtos/character.dto';
import { ValidationError, NotFoundError } from '../utils/errors';
import { Prisma } from '@prisma/client';

export class CharacterService {
    constructor(private characterRepo: CharacterRepository) { }

    async getCharacterById(id: string, userId: string) {
        const character = await this.characterRepo.findById(id);
        if (!character) throw new NotFoundError('Персонаж не знайдений');
        if (character.user_id !== userId) throw new ValidationError('Немає доступу до цього персонажа');
        return character;
    }

    async getUserCharacters(userId: string) {
        return this.characterRepo.findByUser(userId);
    }

    async createCharacter(userId: string, dto: CreateCharacterDto) {
        if (dto.current_hp <= 0 || dto.max_hp <= 0) {
            throw new ValidationError('HP має бути більше 0');
        }
        if (dto.level < 1) throw new ValidationError('Рівень має бути >= 1');

        const data: Prisma.CharacterCreateInput = {
            user: { connect: { id: userId } },
            name: dto.name,
            level: dto.level,
            experience_points: dto.experience_points || 0,
            current_hp: dto.current_hp,
            max_hp: dto.max_hp,
            armor_class: dto.armor_class || 10,
            stats: dto.stats as any,
            ...(dto.race_id && { race: { connect: { id: dto.race_id } } }),
            ...(dto.class_id && { class: { connect: { id: dto.class_id } } }),
            ...(dto.session_id && { session: { connect: { id: dto.session_id } } }),
        };
        return this.characterRepo.create(data);
    }

    async updateCharacter(id: string, userId: string, dto: UpdateCharacterDto) {
        const existing = await this.characterRepo.findById(id);
        if (!existing) throw new NotFoundError('Персонаж не знайдений');
        if (existing.user_id !== userId) throw new ValidationError('Немає прав для редагування');

        const data: Prisma.CharacterUpdateInput = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.current_hp !== undefined) data.current_hp = dto.current_hp;
        if (dto.experience_points !== undefined) data.experience_points = dto.experience_points;
        if (dto.stats !== undefined) data.stats = dto.stats as any;
        if (dto.max_hp !== undefined) data.max_hp = dto.max_hp;
        if (dto.armor_class !== undefined) data.armor_class = dto.armor_class;

        return this.characterRepo.update(id, data);
    }

    async deleteCharacter(id: string, userId: string) {
        const existing = await this.characterRepo.findById(id);
        if (!existing) throw new NotFoundError('Персонаж не знайдений');
        if (existing.user_id !== userId) throw new ValidationError('Немає прав для видалення');
        return this.characterRepo.delete(id);
    }

    async addSpell(characterId: string, userId: string, spellId: string, isPrepared: boolean) {
        const character = await this.characterRepo.findById(characterId);
        if (!character) throw new NotFoundError('Персонаж не знайдений');
        if (character.user_id !== userId) throw new ValidationError('Немає прав');
        return this.characterRepo.addSpell(characterId, spellId, isPrepared);
    }

    async removeSpell(characterId: string, userId: string, spellId: string) {
        const character = await this.characterRepo.findById(characterId);
        if (!character) throw new NotFoundError('Персонаж не знайдений');
        if (character.user_id !== userId) throw new ValidationError('Немає прав');
        return this.characterRepo.removeSpell(characterId, spellId);
    }
}