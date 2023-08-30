import { CommonEntity } from '@servicelabsco/nestjs-utility-services';
import { Column, Entity, ManyToOne } from 'typeorm';
// import { UserEntity } from '@servicelabsco/nestjs-utility-services';

@Entity('todos')
export class TodoEntity extends CommonEntity {
    @Column()
    todo: string;

    @Column({ default: false })
    is_done: boolean;

    @Column()
    user_id: number;

    // @ManyToOne(() => UserEntity, (user) => user.todos)
    // user: User;
}
