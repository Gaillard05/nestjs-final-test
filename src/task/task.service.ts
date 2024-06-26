import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TaskService {
    private userTasksMap: Map<string, Task[]> = new Map<string, Task[]>();
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

    async addTask(name: string, userId: string, priority: number): Promise<Task> {
        if (!name || !userId || priority === undefined || priority <= 0) {
            throw new BadRequestException('Invalid task payload');
        }
    
        let task = await this.taskModel.findOneAndUpdate(
            { name, userId },
            { name, userId, priority },
            { upsert: false, new: true }
        ).exec();
    
        if (!task) {
            // Si aucune tâche n'a été mise à jour, cela signifie qu'elle n'existe pas encore, nous devons donc la créer
            task = await new this.taskModel({ name, userId, priority }).save();
        }
    
        return task;
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

        // Si les tâches de l'utilisateur sont déjà dans la liste fictive, les renvoyer directement
        if (this.userTasksMap.has(userId)) {
            return this.userTasksMap.get(userId);
        }

        // Simuler la récupération des tâches associées à l'utilisateur depuis une source de données
        const tasks = await this.fetchTasksFromDatabase(userId);

        // Stocker les tâches dans la liste fictive
        this.userTasksMap.set(userId, tasks);

        return tasks;
    }

    // Méthode pour simuler la récupération des tâches depuis la base de données
    private async fetchTasksFromDatabase(userId: string): Promise<Task[]> {
        return [
            { userId: userId, name: 'Task 1', priority: 1 },
            { userId: userId, name: 'Task 2', priority: 2 },
            { userId: userId, name: 'Task 3', priority: 3 }
        ];
    }

    async resetData(): Promise<void> {
        await this.taskModel.deleteMany({}).exec();
    }
}