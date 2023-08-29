import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDto {
    @IsNotEmpty()
    @Expose()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Expose()
    password: string;
}
