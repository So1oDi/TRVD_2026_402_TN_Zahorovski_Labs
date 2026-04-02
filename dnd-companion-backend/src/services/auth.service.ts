import { UserRepository } from '../repositories/user.repository';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { generateToken } from '../utils/jwt.util';
import { ValidationError, UnauthorizedError } from '../utils/errors';

export class AuthService {
    constructor(private userRepo: UserRepository) { }

    async register(dto: RegisterDto) {
        const existing = await this.userRepo.findByEmail(dto.email);
        if (existing) throw new ValidationError('Email вже зареєстровано');

        const hashedPassword = await hashPassword(dto.password);
        const user = await this.userRepo.create({
            email: dto.email,
            password_hash: hashedPassword,
            display_name: dto.display_name,
            role: dto.role || 'player',
        });

        const token = generateToken(user.id, user.email, user.role);
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                display_name: user.display_name,
                role: user.role,
            },
        };
    }

    async login(dto: LoginDto) {
        const user = await this.userRepo.findByEmail(dto.email);
        if (!user || !user.password_hash) throw new UnauthorizedError('Невірний email або пароль');

        const isMatch = await comparePassword(dto.password, user.password_hash);
        if (!isMatch) throw new UnauthorizedError('Невірний email або пароль');

        const token = generateToken(user.id, user.email, user.role);
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                display_name: user.display_name,
                role: user.role,
            },
        };
    }
}