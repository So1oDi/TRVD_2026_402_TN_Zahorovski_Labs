import { UserRepository } from '../repositories/user.repository';
import { CharacterRepository } from '../repositories/character.repository';
import { SessionRepository } from '../repositories/session.repository';
import { RaceRepository } from '../repositories/race.repository';
import { ClassRepository } from '../repositories/class.repository';
import { SpellRepository } from '../repositories/spell.repository';
import { ItemRepository } from '../repositories/item.repository';
import { AuthService } from '../services/auth.service';
import { CharacterService } from '../services/character.service';
import { SessionService } from '../services/session.service';
import { HomebrewService } from '../services/homebrew.service';

const userRepo = new UserRepository();
const characterRepo = new CharacterRepository();
const sessionRepo = new SessionRepository();
const raceRepo = new RaceRepository();
const classRepo = new ClassRepository();
const spellRepo = new SpellRepository();
const itemRepo = new ItemRepository();

export const authService = new AuthService(userRepo);
export const characterService = new CharacterService(characterRepo);
export const sessionService = new SessionService(sessionRepo, characterRepo);
export const homebrewService = new HomebrewService(raceRepo, classRepo, spellRepo, itemRepo);