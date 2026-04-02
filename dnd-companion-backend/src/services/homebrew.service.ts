import { RaceRepository } from '../repositories/race.repository';
import { ClassRepository } from '../repositories/class.repository';
import { SpellRepository } from '../repositories/spell.repository';
import { ItemRepository } from '../repositories/item.repository';
import { CreateRaceDto, UpdateRaceDto, CreateClassDto, UpdateClassDto, CreateSpellDto, UpdateSpellDto, CreateItemDto, UpdateItemDto } from '../dtos/homebrew.dto';
import { ValidationError, NotFoundError } from '../utils/errors';
import { Prisma } from '@prisma/client';

export class HomebrewService {
    constructor(
        private raceRepo: RaceRepository,
        private classRepo: ClassRepository,
        private spellRepo: SpellRepository,
        private itemRepo: ItemRepository,
    ) { }

    async getRaces(includeHomebrew: boolean, userId?: string) {
        return this.raceRepo.findAll(includeHomebrew, userId);
    }
    async getRaceById(id: string) {
        const race = await this.raceRepo.findById(id);
        if (!race) throw new NotFoundError('Race not found');
        return race;
    }
    async createRace(userId: string, dto: CreateRaceDto) {
        const data: Prisma.RaceCreateInput = {
            name: dto.name,
            speed: dto.speed,
            traits: dto.traits as any,
            is_homebrew: true,
            creator: { connect: { id: userId } },
        };
        return this.raceRepo.create(data);
    }
    async updateRace(id: string, userId: string, dto: UpdateRaceDto) {
        const race = await this.raceRepo.findById(id);
        if (!race) throw new NotFoundError('Race not found');
        if (race.creator_id !== userId) throw new ValidationError('Only creator can edit');
        const data: Prisma.RaceUpdateInput = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.speed !== undefined) data.speed = dto.speed;
        if (dto.traits !== undefined) data.traits = dto.traits as any;
        return this.raceRepo.update(id, data);
    }
    async deleteRace(id: string, userId: string) {
        const race = await this.raceRepo.findById(id);
        if (!race) throw new NotFoundError('Race not found');
        if (race.creator_id !== userId) throw new ValidationError('Only creator can delete');
        return this.raceRepo.delete(id);
    }

    async getClasses(includeHomebrew: boolean, userId?: string) {
        return this.classRepo.findAll(includeHomebrew, userId);
    }
    async getClassById(id: string) {
        const cls = await this.classRepo.findById(id);
        if (!cls) throw new NotFoundError('Class not found');
        return cls;
    }
    async createClass(userId: string, dto: CreateClassDto) {
        const data: Prisma.ClassCreateInput = {
            name: dto.name,
            hit_die: dto.hit_die,
            features: dto.features as any,
            is_homebrew: true,
            creator: { connect: { id: userId } },
        };
        return this.classRepo.create(data);
    }
    async updateClass(id: string, userId: string, dto: UpdateClassDto) {
        const cls = await this.classRepo.findById(id);
        if (!cls) throw new NotFoundError('Class not found');
        if (cls.creator_id !== userId) throw new ValidationError('Only creator can edit');
        const data: Prisma.ClassUpdateInput = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.hit_die !== undefined) data.hit_die = dto.hit_die;
        if (dto.features !== undefined) data.features = dto.features as any;
        return this.classRepo.update(id, data);
    }
    async deleteClass(id: string, userId: string) {
        const cls = await this.classRepo.findById(id);
        if (!cls) throw new NotFoundError('Class not found');
        if (cls.creator_id !== userId) throw new ValidationError('Only creator can delete');
        return this.classRepo.delete(id);
    }

    async getSpells(includeHomebrew: boolean, userId?: string) {
        return this.spellRepo.findAll(includeHomebrew, userId);
    }
    async getSpellById(id: string) {
        const spell = await this.spellRepo.findById(id);
        if (!spell) throw new NotFoundError('Spell not found');
        return spell;
    }
    async createSpell(userId: string, dto: CreateSpellDto) {
        const data: Prisma.SpellCreateInput = {
            name: dto.name,
            level: dto.level,
            school: dto.school,
            description: dto.description,
            is_homebrew: true,
            creator: { connect: { id: userId } },
        };
        return this.spellRepo.create(data);
    }
    async updateSpell(id: string, userId: string, dto: UpdateSpellDto) {
        const spell = await this.spellRepo.findById(id);
        if (!spell) throw new NotFoundError('Spell not found');
        if (spell.creator_id !== userId) throw new ValidationError('Only creator can edit');
        const data: Prisma.SpellUpdateInput = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.level !== undefined) data.level = dto.level;
        if (dto.school !== undefined) data.school = dto.school;
        if (dto.description !== undefined) data.description = dto.description;
        return this.spellRepo.update(id, data);
    }
    async deleteSpell(id: string, userId: string) {
        const spell = await this.spellRepo.findById(id);
        if (!spell) throw new NotFoundError('Spell not found');
        if (spell.creator_id !== userId) throw new ValidationError('Only creator can delete');
        return this.spellRepo.delete(id);
    }

    async getItems(includeHomebrew: boolean, userId?: string) {
        return this.itemRepo.findAll(includeHomebrew, userId);
    }
    async getItemById(id: string) {
        const item = await this.itemRepo.findById(id);
        if (!item) throw new NotFoundError('Item not found');
        return item;
    }
    async createItem(userId: string, dto: CreateItemDto) {
        const data: Prisma.ItemCreateInput = {
            name: dto.name,
            type: dto.type,
            damage: dto.damage,
            properties: dto.properties as any,
            is_homebrew: true,
            creator: { connect: { id: userId } },
        };
        return this.itemRepo.create(data);
    }
    async updateItem(id: string, userId: string, dto: UpdateItemDto) {
        const item = await this.itemRepo.findById(id);
        if (!item) throw new NotFoundError('Item not found');
        if (item.creator_id !== userId) throw new ValidationError('Only creator can edit');
        const data: Prisma.ItemUpdateInput = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.type !== undefined) data.type = dto.type;
        if (dto.damage !== undefined) data.damage = dto.damage;
        if (dto.properties !== undefined) data.properties = dto.properties as any;
        return this.itemRepo.update(id, data);
    }
    async deleteItem(id: string, userId: string) {
        const item = await this.itemRepo.findById(id);
        if (!item) throw new NotFoundError('Item not found');
        if (item.creator_id !== userId) throw new ValidationError('Only creator can delete');
        return this.itemRepo.delete(id);
    }
}