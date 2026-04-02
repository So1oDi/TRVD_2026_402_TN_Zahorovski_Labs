import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export function generateToken(userId: string, email: string, role: string): string {
    return jwt.sign({ id: userId, email, role }, SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, SECRET);
}