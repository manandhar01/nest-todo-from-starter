import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { TodoEntity } from '../entities/todo.entity';
import { AccessException, Auth } from '@servicelabsco/nestjs-utility-services';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@Injectable()
export class TodosService {
    async create(createTodoDto: CreateTodoDto) {
        const user = Auth.user();

        const newTodo = new TodoEntity();

        newTodo.todo = createTodoDto.todo;
        newTodo.is_done = createTodoDto.is_done;
        newTodo.user_id = user.id;

        return newTodo.save();
    }

    async getAll(is_done?: boolean) {
        const user = Auth.user();

        if (is_done === undefined) {
            return TodoEntity.find({ where: { user_id: user.id } });
        }

        return TodoEntity.find({ where: { is_done, user_id: user.id } });
    }

    async getOne(id: number) {
        const user = Auth.user();

        return TodoEntity.findOne({ where: { id, user_id: user.id } });
    }

    async update(id: number, updateTodoDto: UpdateTodoDto) {
        const user = Auth.user();

        const record = await TodoEntity.findOne({ where: { id, user_id: user.id } });

        if (!record) {
            throw new AccessException();
        }

        record.todo = updateTodoDto.todo;
        record.is_done = updateTodoDto.is_done;

        return record.save();
    }

    async delete(id: number) {
        const user = Auth.user();

        const record = await TodoEntity.findOne({ where: { id, user_id: user.id } });

        if (!record) {
            throw new AccessException();
        }

        return TodoEntity.softDelete({ id, user_id: user.id });
    }
}
