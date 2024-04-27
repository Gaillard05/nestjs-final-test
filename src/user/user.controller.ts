import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/')
    async addUser(@Body('email') email: string) {
        return this.userService.addUser(email);
    }

    @Get('/user/:email')
    async getUser(@Param('email') email: string) {
        return this.userService.getUser(email);
    }
}