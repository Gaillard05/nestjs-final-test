import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { UserModule } from './user/user.module';
import { User, UserSchema } from './user/schemas/user.schema';
import { Task, TaskSchema } from './task/schemas/task.schema';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule, UserModule, MongooseModule.forFeature([{ name: User.name,  schema: UserSchema }, {name: Task.name,  schema: TaskSchema}])],
    controllers: [UserController, TaskController],
    providers: [UserService, TaskService]
})
export class AppModule {}
