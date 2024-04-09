import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
  }