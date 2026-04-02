import { IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateSessionDto {
    @IsString()
    name: string;
}

export class UpdateSessionDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class JoinSessionDto {
    @IsString()
    invite_code: string;
}

export class SessionResponseDto {
    id: string;
    name: string;
    invite_code: string;
    is_active: boolean;
    dm_id: string;
    dm_name?: string;
    participants: Array<{ id: string; display_name: string }>;
    created_at: Date;

    constructor(session: any) {
        this.id = session.id;
        this.name = session.name;
        this.invite_code = session.invite_code;
        this.is_active = session.is_active;
        this.dm_id = session.dm_id;
        this.dm_name = session.dm?.display_name;
        this.participants = session.participants?.map((p: any) => ({
            id: p.user.id,
            display_name: p.user.display_name,
        })) || [];
        this.created_at = session.created_at;
    }
}