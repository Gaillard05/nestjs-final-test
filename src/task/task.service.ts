// task.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

    async addTask(name: string, userId: string, priority: number): Promise<TaskDocument> {
        if (!name || !userId || priority === undefined || priority <= 0) {
            throw new Error('Invalid task payload');
        }

        const existingTask = await this.taskModel.findOne({ name, userId }).exec();
        if (existingTask) {
            throw new ConflictException('Task already exists');
        }

        const newTask = new this.taskModel({ name, userId, priority });
        return newTask.save();
    }

    async getTaskByName(name: string): Promise<TaskDocument> {
        return this.taskModel.findOne({ name }).exec();
    }

    async getUserTasks(userId: string): Promise<TaskDocument[]> {
        return this.taskModel.find({ userId }).exec();
    }

    async resetData(): Promise<void> {
        await this.taskModel.deleteMany({}).exec();
    }
}