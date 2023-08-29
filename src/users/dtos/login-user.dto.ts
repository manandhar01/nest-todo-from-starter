import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Expose()
    password: string;
}
