import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTodoDto {
    @IsOptional()
    todo: string;

    @IsOptional()
    @IsBoolean()
    is_done?: boolean;
}
