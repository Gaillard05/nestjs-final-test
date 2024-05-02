// task.controller.ts
import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDocument } from './schemas/task.schema';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('/')
    async addTask(@Body('name') name: string, @Body('userId') userId: string, @Body('priority', ParseIntPipe) priority: number): Promise<TaskDocument> {
        return this.taskService.addTask(name, userId, priority);
    }

    @Get('/task')
    async getUser(@Param('name') name: string) {
        return this.taskService.getTaskByName(name);
    }

    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: string): Promise<TaskDocument[]> {
        return this.taskService.getUserTasks(userId);
    }
}
