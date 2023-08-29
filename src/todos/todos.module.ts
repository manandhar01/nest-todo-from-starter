import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';

@Module({
    controllers: [TodosController],
    providers: [TodosService],
})
export class TodosModule {}
