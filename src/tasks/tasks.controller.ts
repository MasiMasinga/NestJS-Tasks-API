import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

// Task Service
import { TasksService } from './tasks.service';

// DTO(Data Transfer Object)
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        const result = await this.tasksService.create(createTaskDto);
        return result;
    };

    @Get()
    async findAll(): Promise<TaskResponseDto[]> {
        const tasks = await this.tasksService.findAll();
        return tasks;
    };

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TaskResponseDto> {
        const task = await this.tasksService.findOne(id);
        return task;
    };

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
        const result = await this.tasksService.update(id, updateTaskDto);
        return result;
    };

    @Delete(':id')
    async remove(@Param('id') id: number) {
        const result = await this.tasksService.remove(id);
        return result;
    };
}
