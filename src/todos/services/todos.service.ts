import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { TodoEntity } from '../entities/todo.entity';
import { AccessException } from '@servicelabsco/nestjs-utility-services';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@Injectable()
export class TodosService {
    async create(createTodoDto: CreateTodoDto) {
        return TodoEntity.firstOrCreate(createTodoDto);
    }

    async getAll(is_done?: boolean) {
        if (is_done === undefined) {
            return TodoEntity.find({ order: { todo: 'DESC' }, take: 1 });
        }
        return TodoEntity.find({ where: { is_done } });
    }

    async getOne(id: number) {
        return TodoEntity.first(id);
    }

    async update(id: number, updateTodoDto: UpdateTodoDto) {
        const record = await TodoEntity.first(id);

        if (!record) {
            throw new AccessException();
        }

        record.todo = updateTodoDto.todo;
        return record.save();
    }

    async delete(id: number) {
        return TodoEntity.softDelete({ id });
    }
}
