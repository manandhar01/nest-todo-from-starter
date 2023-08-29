import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AddUserDto } from '../dtos/add-user.dto';

@Injectable()
export class UsersService {
    async addUser(addUserDto: AddUserDto) {
        const user = User.find({ where: { email: addUserDto.email } });

        if (user) {
            throw new NotAcceptableException();
        }

        return User.firstOrCreate(addUserDto);
    }

    async getOne(email: string) {
        const user = User.find({ where: { email } });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
