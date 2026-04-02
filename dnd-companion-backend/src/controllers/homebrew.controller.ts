import { Request, Response } from 'express';
import { HomebrewService } from '../services/homebrew.service';
import { CreateRaceDto, UpdateRaceDto, CreateClassDto, UpdateClassDto, CreateSpellDto, UpdateSpellDto, CreateItemDto, UpdateItemDto } from '../dtos/homebrew.dto';

export class HomebrewController {
    constructor(private homebrewService: HomebrewService) { }

    // ========== Races ==========
    /**
     * @swagger
     * /homebrew/races:
     *   get:
     *     summary: Отримати всі раси (стандартні + homebrew)
     *     tags: [Homebrew]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: includeHomebrew
     *         schema:
     *           type: boolean
     *         description: Включити homebrew раси
     *     responses:
     *       200:
     *         description: Список рас
     */
    async getRaces(req: Request, res: Response) {
        const includeHomebrew = req.query.includeHomebrew !== 'false';
        const races = await this.homebrewService.getRaces(includeHomebrew, req.user!.id);
        res.json(races);
    }

    /**
     * @swagger
     * /homebrew/races/{id}:
     *   get:
     *     summary: Отримати расу за ID
     *     tags: [Homebrew]
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
     *         description: Дані раси
     *       404:
     *         description: Раса не знайдена
     */
    async getRaceById(req: Request, res: Response) {
        const id = req.params.id as string;
        const race = await this.homebrewService.getRaceById(id);
        res.json(race);
    }

    /**
     * @swagger
     * /homebrew/races:
     *   post:
     *     summary: Створити нову homebrew расу
     *     tags: [Homebrew]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [name]
     *             properties:
     *               name:
     *                 type: string
     *               speed:
     *                 type: number
     *               traits:
     *                 type: object
     *     responses:
     *       201:
     *         description: Раса створена
     */
    async createRace(req: Request, res: Response) {
        const race = await this.homebrewService.createRace(req.user!.id, req.body as CreateRaceDto);
        res.status(201).json(race);
    }

    /**
     * @swagger
     * /homebrew/races/{id}:
     *   put:
     *     summary: Оновити homebrew расу
     *     tags: [Homebrew]
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
     *               speed:
     *                 type: number
     *               traits:
     *                 type: object
     *     responses:
     *       200:
     *         description: Оновлена раса
     */
    async updateRace(req: Request, res: Response) {
        const id = req.params.id as string;
        const race = await this.homebrewService.updateRace(id, req.user!.id, req.body as UpdateRaceDto);
        res.json(race);
    }

    /**
     * @swagger
     * /homebrew/races/{id}:
     *   delete:
     *     summary: Видалити homebrew расу
     *     tags: [Homebrew]
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
     *         description: Раса видалена
     */
    async deleteRace(req: Request, res: Response) {
        const id = req.params.id as string;
        await this.homebrewService.deleteRace(id, req.user!.id);
        res.status(204).send();
    }

    // ========== Classes ==========
    /**
     * @swagger
     * /homebrew/classes:
     *   get:
     *     summary: Отримати всі класи (стандартні + homebrew)
     *     tags: [Homebrew]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Список класів
     */
    async getClasses(req: Request, res: Response) {
        const includeHomebrew = req.query.includeHomebrew !== 'false';
        const classes = await this.homebrewService.getClasses(includeHomebrew, req.user!.id);
        res.json(classes);
    }

    /**
     * @swagger
     * /homebrew/classes/{id}:
     *   get:
     *     summary: Отримати клас за ID
     *     tags: [Homebrew]
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
     *         description: Дані класу
     */
    async getClassById(req: Request, res: Response) {
        const id = req.params.id as string;
        const cls = await this.homebrewService.getClassById(id);
        res.json(cls);
    }

    /**
     * @swagger
     * /homebrew/classes:
     *   post:
     *     summary: Створити новий homebrew клас
     *     tags: [Homebrew]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [name]
     *             properties:
     *               name:
     *                 type: string
     *               hit_die:
     *                 type: number
     *               features:
     *                 type: object
     *     responses:
     *       201:
     *         description: Клас створено
     */
    async createClass(req: Request, res: Response) {
        const cls = await this.homebrewService.createClass(req.user!.id, req.body as CreateClassDto);
        res.status(201).json(cls);
    }

    /**
     * @swagger
     * /homebrew/classes/{id}:
     *   put:
     *     summary: Оновити homebrew клас
     *     tags: [Homebrew]
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
     *               hit_die:
     *                 type: number
     *               features:
     *                 type: object
     *     responses:
     *       200:
     *         description: Оновлений клас
     */
    async updateClass(req: Request, res: Response) {
        const id = req.params.id as string;
        const cls = await this.homebrewService.updateClass(id, req.user!.id, req.body as UpdateClassDto);
        res.json(cls);
    }

    /**
     * @swagger
     * /homebrew/classes/{id}:
     *   delete:
     *     summary: Видалити homebrew клас
     *     tags: [Homebrew]
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
     *         description: Клас видалено
     */
    async deleteClass(req: Request, res: Response) {
        const id = req.params.id as string;
        await this.homebrewService.deleteClass(id, req.user!.id);
        res.status(204).send();
    }

    // ========== Spells ==========
    /**
     * @swagger
     * /homebrew/spells:
     *   get:
     *     summary: Отримати всі заклинання (стандартні + homebrew)
     *     tags: [Homebrew]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Список заклинань
     */
    async getSpells(req: Request, res: Response) {
        const includeHomebrew = req.query.includeHomebrew !== 'false';
        const spells = await this.homebrewService.getSpells(includeHomebrew, req.user!.id);
        res.json(spells);
    }

    /**
     * @swagger
     * /homebrew/spells/{id}:
     *   get:
     *     summary: Отримати заклинання за ID
     *     tags: [Homebrew]
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
     *         description: Дані заклинання
     */
    async getSpellById(req: Request, res: Response) {
        const id = req.params.id as string;
        const spell = await this.homebrewService.getSpellById(id);
        res.json(spell);
    }

    /**
     * @swagger
     * /homebrew/spells:
     *   post:
     *     summary: Створити нове homebrew заклинання
     *     tags: [Homebrew]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [name]
     *             properties:
     *               name:
     *                 type: string
     *               level:
     *                 type: number
     *               school:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       201:
     *         description: Заклинання створено
     */
    async createSpell(req: Request, res: Response) {
        const spell = await this.homebrewService.createSpell(req.user!.id, req.body as CreateSpellDto);
        res.status(201).json(spell);
    }

    /**
     * @swagger
     * /homebrew/spells/{id}:
     *   put:
     *     summary: Оновити homebrew заклинання
     *     tags: [Homebrew]
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
     *               level:
     *                 type: number
     *               school:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       200:
     *         description: Оновлене заклинання
     */
    async updateSpell(req: Request, res: Response) {
        const id = req.params.id as string;
        const spell = await this.homebrewService.updateSpell(id, req.user!.id, req.body as UpdateSpellDto);
        res.json(spell);
    }

    /**
     * @swagger
     * /homebrew/spells/{id}:
     *   delete:
     *     summary: Видалити homebrew заклинання
     *     tags: [Homebrew]
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
     *         description: Заклинання видалено
     */
    async deleteSpell(req: Request, res: Response) {
        const id = req.params.id as string;
        await this.homebrewService.deleteSpell(id, req.user!.id);
        res.status(204).send();
    }

    // ========== Items ==========
    /**
     * @swagger
     * /homebrew/items:
     *   get:
     *     summary: Отримати всі предмети (стандартні + homebrew)
     *     tags: [Homebrew]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Список предметів
     */
    async getItems(req: Request, res: Response) {
        const includeHomebrew = req.query.includeHomebrew !== 'false';
        const items = await this.homebrewService.getItems(includeHomebrew, req.user!.id);
        res.json(items);
    }

    /**
     * @swagger
     * /homebrew/items/{id}:
     *   get:
     *     summary: Отримати предмет за ID
     *     tags: [Homebrew]
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
     *         description: Дані предмета
     */
    async getItemById(req: Request, res: Response) {
        const id = req.params.id as string;
        const item = await this.homebrewService.getItemById(id);
        res.json(item);
    }

    /**
     * @swagger
     * /homebrew/items:
     *   post:
     *     summary: Створити новий homebrew предмет
     *     tags: [Homebrew]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [name]
     *             properties:
     *               name:
     *                 type: string
     *               type:
     *                 type: string
     *               damage:
     *                 type: string
     *               properties:
     *                 type: object
     *     responses:
     *       201:
     *         description: Предмет створено
     */
    async createItem(req: Request, res: Response) {
        const item = await this.homebrewService.createItem(req.user!.id, req.body as CreateItemDto);
        res.status(201).json(item);
    }

    /**
     * @swagger
     * /homebrew/items/{id}:
     *   put:
     *     summary: Оновити homebrew предмет
     *     tags: [Homebrew]
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
     *               type:
     *                 type: string
     *               damage:
     *                 type: string
     *               properties:
     *                 type: object
     *     responses:
     *       200:
     *         description: Оновлений предмет
     */
    async updateItem(req: Request, res: Response) {
        const id = req.params.id as string;
        const item = await this.homebrewService.updateItem(id, req.user!.id, req.body as UpdateItemDto);
        res.json(item);
    }

    /**
     * @swagger
     * /homebrew/items/{id}:
     *   delete:
     *     summary: Видалити homebrew предмет
     *     tags: [Homebrew]
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
     *         description: Предмет видалено
     */
    async deleteItem(req: Request, res: Response) {
        const id = req.params.id as string;
        await this.homebrewService.deleteItem(id, req.user!.id);
        res.status(204).send();
    }
}