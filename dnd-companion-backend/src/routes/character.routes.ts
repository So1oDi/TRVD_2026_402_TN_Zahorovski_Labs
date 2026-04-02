import { Router } from 'express';
import { CharacterController } from '../controllers/character.controller';
import { characterService } from '../config/di';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDto } from '../middlewares/validation.middleware';
import { CreateCharacterDto, UpdateCharacterDto, AddSpellDto } from '../dtos/character.dto';

const router = Router();
const controller = new CharacterController(characterService);

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Управління персонажами
 */

router.get('/', controller.getCharacters.bind(controller));
router.get('/:id', controller.getCharacterById.bind(controller));
router.post('/', validateDto(CreateCharacterDto), controller.createCharacter.bind(controller));
router.put('/:id', validateDto(UpdateCharacterDto), controller.updateCharacter.bind(controller));
router.delete('/:id', controller.deleteCharacter.bind(controller));
router.post('/:id/spells', validateDto(AddSpellDto), controller.addSpell.bind(controller));
router.delete('/:id/spells/:spellId', controller.removeSpell.bind(controller));

export default router;