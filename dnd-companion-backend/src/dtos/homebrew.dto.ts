import { IsString, IsOptional, IsInt, IsObject, IsBoolean, IsUUID } from 'class-validator';

export class CreateRaceDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    speed?: number;

    @IsOptional()
    @IsObject()
    traits?: Record<string, any>;
}
export class UpdateRaceDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    speed?: number;

    @IsOptional()
    @IsObject()
    traits?: Record<string, any>;
}

export class CreateClassDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    hit_die?: number;

    @IsOptional()
    @IsObject()
    features?: Record<string, any>;
}
export class UpdateClassDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    hit_die?: number;

    @IsOptional()
    @IsObject()
    features?: Record<string, any>;
}

export class CreateSpellDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    level?: number;

    @IsOptional()
    @IsString()
    school?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
export class UpdateSpellDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    level?: number;

    @IsOptional()
    @IsString()
    school?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class CreateItemDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    damage?: string;

    @IsOptional()
    @IsObject()
    properties?: Record<string, any>;
}
export class UpdateItemDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    damage?: string;

    @IsOptional()
    @IsObject()
    properties?: Record<string, any>;
}