import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@Controller('api/todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    create(
        // @Request() req,
        @Body() createTodoDto: CreateTodoDto
    ) {
        return this.todosService.create(createTodoDto);
    }

    @Get()
    findAll() {
        return this.todosService.getAll();
    }

    @Get('completed')
    findAllCompleted() {
        return this.todosService.getAll(true);
    }

    @Get('notcompleted')
    findAllNotCompleted() {
        return this.todosService.getAll(false);
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.todosService.getOne(id);
    }

    @Patch(':id')
    update(
        // @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTodoDto: UpdateTodoDto
    ) {
        return this.todosService.update(id, updateTodoDto);
    }

    @Delete(':id')
    remove(
        // @Request() req,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.todosService.delete(id);
    }
}
