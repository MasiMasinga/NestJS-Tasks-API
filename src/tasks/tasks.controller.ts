import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpException,
    HttpStatus,
    UsePipes,
    ValidationPipe,
    ParseIntPipe
} from '@nestjs/common';

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
    @UsePipes(new ValidationPipe())
    async create(@Body() createTaskDto: CreateTaskDto) {
        try {
            const result = await this.tasksService.create(createTaskDto);
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Get()
    async findAll(): Promise<TaskResponseDto[]> {
        try {
            const tasks = await this.tasksService.findAll();
            return tasks;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskResponseDto> {
        try {
            const task = await this.tasksService.findOne(id);
            return task;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        try {
            const result = await this.tasksService.update(id, updateTaskDto);
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        try {
            const result = await this.tasksService.remove(id);
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
}
