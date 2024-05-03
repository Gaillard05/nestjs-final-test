import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

    async addTask(name: string, userId: string, priority: number): Promise<Task> {
        if (!name || !userId || priority === undefined || priority <= 0) {
            throw new BadRequestException('Invalid task payload');
        }
    
        const existingTask = await this.taskModel.findOne({ name, userId }).exec();
        if (existingTask) {
            throw new ConflictException('Task with this name already exists for this user');
        }
    
        const newTask = new this.taskModel({ name, userId, priority });
        return newTask.save();
    }

    async getTaskByName(name: string): Promise<Task> {
        const task = await this.taskModel.findOne({ name }).exec();
        if (!task) {
            throw new NotFoundException(`Task with name ${name} not found`);
        }
        return task;
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        // Vérifie si userId est valide et de longueur 24 caractères
        if (!userId || userId.length !== 24 || !/^[a-f\d]{24}$/i.test(userId)) {
            throw new BadRequestException('Invalid userId');
        }
    
        // Récupère les tâches associées à l'utilisateur
        const tasks = await this.taskModel.find({ userId }).exec();
    
        // Filtrer les tâches pour qu'elles soient uniques en fonction de leur nom
        const uniqueTasks = [];
        const taskNamesSet = new Set<string>();
    
        for (const task of tasks) {
            if (!taskNamesSet.has(task.name)) {
                uniqueTasks.push(task);
                taskNamesSet.add(task.name);
            }
        }
    
        return uniqueTasks;
    }

    async resetData(): Promise<void> {
        await this.taskModel.deleteMany({}).exec();
    }
}