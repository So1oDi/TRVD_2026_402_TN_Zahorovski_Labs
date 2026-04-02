import { IsString, IsInt, IsOptional, IsUUID, Min, Max, IsObject, IsBoolean } from 'class-validator';

export class CreateCharacterDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsUUID()
    race_id?: string;

    @IsOptional()
    @IsUUID()
    class_id?: string;

    @IsInt()
    @Min(1)
    level: number = 1;

    @IsOptional()
    @IsInt()
    @Min(0)
    experience_points?: number;

    @IsInt()
    @Min(1)
    current_hp: number;

    @IsInt()
    @Min(1)
    max_hp: number;

    @IsOptional()
    @IsInt()
    @Min(8)
    armor_class?: number;

    @IsObject()
    stats: Record<string, number>;

    @IsOptional()
    @IsUUID()
    session_id?: string;
}

export class UpdateCharacterDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    current_hp?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    experience_points?: number;

    @IsOptional()
    @IsObject()
    stats?: Record<string, number>;

    @IsOptional()
    @IsInt()
    @Min(1)
    max_hp?: number;

    @IsOptional()
    @IsInt()
    armor_class?: number;
}

export class AddSpellDto {
    @IsUUID()
    spell_id: string;

    @IsBoolean()
    is_prepared: boolean = false;
}

export class CharacterResponseDto {
    id: string;
    name: string;
    level: number;
    current_hp: number;
    max_hp: number;
    armor_class: number;
    stats: any;
    experience_points: number;
    race_name?: string;
    class_name?: string;
    user_id: string;
    session_id?: string;

    constructor(character: any) {
        this.id = character.id;
        this.name = character.name;
        this.level = character.level;
        this.current_hp = character.current_hp;
        this.max_hp = character.max_hp;
        this.armor_class = character.armor_class;
        this.stats = character.stats;
        this.experience_points = character.experience_points;
        this.race_name = character.race?.name;
        this.class_name = character.class?.name;
        this.user_id = character.user_id;
        this.session_id = character.session_id;
    }
}