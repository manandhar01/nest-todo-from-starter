import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    @Expose()
    todo: string;

    @IsOptional()
    @IsBoolean()
    @Expose()
    is_done?: boolean;
}
