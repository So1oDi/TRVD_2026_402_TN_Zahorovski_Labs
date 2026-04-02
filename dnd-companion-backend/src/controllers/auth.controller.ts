import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';

export class AuthController {
    constructor(private authService: AuthService) { }

    async register(req: Request, res: Response) {
        const dto = req.body as RegisterDto;
        const result = await this.authService.register(dto);
        res.status(201).json(result);
    }

    async login(req: Request, res: Response) {
        const dto = req.body as LoginDto;
        const result = await this.authService.login(dto);
        res.json(result);
    }

    async getMe(req: Request, res: Response) {
        res.json(req.user);
    }
}