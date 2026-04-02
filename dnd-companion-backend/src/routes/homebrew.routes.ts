import { Router } from 'express';
import { HomebrewController } from '../controllers/homebrew.controller';
import { homebrewService } from '../config/di';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDto } from '../middlewares/validation.middleware';
import { CreateRaceDto, UpdateRaceDto, CreateClassDto, UpdateClassDto, CreateSpellDto, UpdateSpellDto, CreateItemDto, UpdateItemDto } from '../dtos/homebrew.dto';

const router = Router();
const controller = new HomebrewController(homebrewService);

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Homebrew
 *   description: Кастомний контент (раси, класи, заклинання, предмети)
 */

router.get('/races', controller.getRaces.bind(controller));
router.get('/races/:id', controller.getRaceById.bind(controller));
router.post('/races', validateDto(CreateRaceDto), controller.createRace.bind(controller));
router.put('/races/:id', validateDto(UpdateRaceDto), controller.updateRace.bind(controller));
router.delete('/races/:id', controller.deleteRace.bind(controller));

router.get('/classes', controller.getClasses.bind(controller));
router.get('/classes/:id', controller.getClassById.bind(controller));
router.post('/classes', validateDto(CreateClassDto), controller.createClass.bind(controller));
router.put('/classes/:id', validateDto(UpdateClassDto), controller.updateClass.bind(controller));
router.delete('/classes/:id', controller.deleteClass.bind(controller));

router.get('/spells', controller.getSpells.bind(controller));
router.get('/spells/:id', controller.getSpellById.bind(controller));
router.post('/spells', validateDto(CreateSpellDto), controller.createSpell.bind(controller));
router.put('/spells/:id', validateDto(UpdateSpellDto), controller.updateSpell.bind(controller));
router.delete('/spells/:id', controller.deleteSpell.bind(controller));

router.get('/items', controller.getItems.bind(controller));
router.get('/items/:id', controller.getItemById.bind(controller));
router.post('/items', validateDto(CreateItemDto), controller.createItem.bind(controller));
router.put('/items/:id', validateDto(UpdateItemDto), controller.updateItem.bind(controller));
router.delete('/items/:id', controller.deleteItem.bind(controller));

export default router;