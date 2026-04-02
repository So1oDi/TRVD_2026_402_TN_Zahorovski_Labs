import { Request, Response } from 'express';
import { CharacterService } from '../services/character.service';
import { CreateCharacterDto, UpdateCharacterDto, CharacterResponseDto, AddSpellDto } from '../dtos/character.dto';

export class CharacterController {
    constructor(private characterService: CharacterService) { }

    /**
     * @swagger
     * /characters:
     *   get:
     *     summary: Отримати всіх персонажів користувача
     *     tags: [Characters]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Список персонажів
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CharacterResponse'
     */
    async getCharacters(req: Request, res: Response) {
        const userId = req.user!.id;
        const characters = await this.characterService.getUserCharacters(userId);
        const dtos = characters.map(c => new CharacterResponseDto(c));
        res.json(dtos);
    }

    /**
     * @swagger
     * /characters/{id}:
     *   get:
     *     summary: Отримати персонажа за ID
     *     tags: [Characters]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Дані персонажа
     *       404:
     *         description: Персонаж не знайдений
     */
    async getCharacterById(req: Request, res: Response) {
        const id = req.params.id as string;
        const userId = req.user!.id;
        const character = await this.characterService.getCharacterById(id, userId);
        res.json(new CharacterResponseDto(character));
    }

    /**
     * @swagger
     * /characters:
     *   post:
     *     summary: Створити нового персонажа
     *     tags: [Characters]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [name, current_hp, max_hp, stats]
     *             properties:
     *               name:
     *                 type: string
     *               race_id:
     *                 type: string
     *               class_id:
     *                 type: string
     *               level:
     *                 type: number
     *               current_hp:
     *                 type: number
     *               max_hp:
     *                 type: number
     *               armor_class:
     *                 type: number
     *               stats:
     *                 type: object
     *               session_id:
     *                 type: string
     *     responses:
     *       201:
     *         description: Персонаж створений
     */
    async createCharacter(req: Request, res: Response) {
        const userId = req.user!.id;
        const dto = req.body as CreateCharacterDto;
        const newChar = await this.characterService.createCharacter(userId, dto);
        res.status(201).json(new CharacterResponseDto(newChar));
    }

    /**
     * @swagger
     * /characters/{id}:
     *   put:
     *     summary: Оновити персонажа
     *     tags: [Characters]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               current_hp:
     *                 type: number
     *               experience_points:
     *                 type: number
     *               stats:
     *                 type: object
     *               max_hp:
     *                 type: number
     *               armor_class:
     *                 type: number
     *     responses:
     *       200:
     *         description: Оновлений персонаж
     */
    async updateCharacter(req: Request, res: Response) {
        const id = req.params.id as string;
        const userId = req.user!.id;
        const dto = req.body as UpdateCharacterDto;
        const updated = await this.characterService.updateCharacter(id, userId, dto);
        res.json(new CharacterResponseDto(updated));
    }

    /**
     * @swagger
     * /characters/{id}:
     *   delete:
     *     summary: Видалити персонажа
     *     tags: [Characters]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Персонаж видалений
     */
    async deleteCharacter(req: Request, res: Response) {
        const id = req.params.id as string;
        const userId = req.user!.id;
        await this.characterService.deleteCharacter(id, userId);
        res.status(204).send();
    }

    /**
     * @swagger
     * /characters/{id}/spells:
     *   post:
     *     summary: Додати заклинання персонажу
     *     tags: [Characters]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [spell_id]
     *             properties:
     *               spell_id:
     *                 type: string
     *               is_prepared:
     *                 type: boolean
     *     responses:
     *       201:
     *         description: Заклинання додано
     */
    async addSpell(req: Request, res: Response) {
        const id = req.params.id as string;
        const userId = req.user!.id;
        const { spell_id, is_prepared } = req.body as AddSpellDto;
        await this.characterService.addSpell(id, userId, spell_id, is_prepared);
        res.status(201).json({ message: 'Заклинання додано' });
    }

    /**
     * @swagger
     * /characters/{id}/spells/{spellId}:
     *   delete:
     *     summary: Видалити заклинання у персонажа
     *     tags: [Characters]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: spellId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Заклинання видалено
     */
    async removeSpell(req: Request, res: Response) {
        const id = req.params.id as string;
        const spellId = req.params.spellId as string;
        const userId = req.user!.id;
        await this.characterService.removeSpell(id, userId, spellId);
        res.status(204).send();
    }
}