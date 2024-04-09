import { Injectable } from '@nestjs/common';

// Prisma Service
import { PrismaService } from 'src/prisma.service';

// DTO(Data Transfer Object)
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async create(createTaskDto: CreateTaskDto) {
        const createdTask = await this.prisma.task.create({
            data: {
                title: createTaskDto.title,
                completed: createTaskDto.completed
            }
        });

        return {
            message: 'Task created successfully',
            data: createdTask
        }
    };

    async findAll(): Promise<TaskResponseDto[]> {
        const tasks = await this.prisma.task.findMany();

        return tasks.map(task => {
            return {
                id: task.id,
                title: task.title,
                completed: task.completed,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
                message: 'Task retrieved successfully'
            }
        });
    };

    async findOne(id: number): Promise<TaskResponseDto> {
        const task = await this.prisma.task.findUnique({
            where: { id: id }
        });

        return {
            id: task.id,
            title: task.title,
            completed: task.completed,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            message: 'Task retrieved successfully'
        }
    };

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const updatedTask = await this.prisma.task.update({
            where: { id : id },
            data: {
                title: updateTaskDto.title,
                completed: updateTaskDto.completed
            }
        });

        return {
            message: 'Task updated successfully',
            data: updatedTask
        }
    };

    async remove(id: number) {
        const deletedTask = await this.prisma.task.delete({
            where: { id: id }
        });

        return {
            message: 'Task deleted successfully',
            data: deletedTask
        }
    };
}
