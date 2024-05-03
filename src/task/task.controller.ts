// task.controller.ts
import { Controller, Post, Body, Get, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('/')
    async addTask(@Body('name') name: string, @Body('userId') userId: string, @Body('priority', ParseIntPipe) priority: number) {
        return this.taskService.addTask(name, userId, priority);
    }

    @Get('/task')
    async getTaskByName(@Param('name') name: string) {
        return this.taskService.getTaskByName(name);
    }

    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: string) {
        const tasks = await this.taskService.getUserTasks(userId);
        return { tasks }; // Retourne les tâches dans un objet
    }

    @Delete('/reset')
    async resetData() {
        return this.taskService.resetData();
    }
}