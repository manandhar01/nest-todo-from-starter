import { CommonEntity, UserEntity } from '@servicelabsco/nestjs-utility-services';
import { TodoEntity } from '../../todos/entities/todo.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('sys_users')
export class User extends UserEntity {
    // @Column()
    // name: string;

    // @Column()
    // email: string;

    // @Column()
    // password: string;

    @OneToMany(() => TodoEntity, (todo) => todo.user)
    todos: TodoEntity[];
}
