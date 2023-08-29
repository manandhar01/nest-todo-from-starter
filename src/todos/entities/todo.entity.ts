import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('todos')
export class TodoEntity extends CommonEntity {
    @Column()
    todo: string;

    @Column({ default: false })
    is_done: boolean;

    @ManyToOne(() => User, (user) => user.todos)
    user: User;
}
