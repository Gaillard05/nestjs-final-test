import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { User, UserSchema } from './user/schemas/user.schema';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule, UserModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [AppController, UserController],
    providers: [AppService, UserService]
})
export class AppModule {}
