import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async addUser(email: string): Promise<void> {
        if (!this.isValidEmail(email)) {
            throw new BadRequestException('Invalid email');
        }

        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const newUser = new this.userModel({ email });
        await newUser.save();
    }

    async getUser(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async resetData(email: string): Promise<void> {
        await this.userModel.deleteMany({email}).exec();
    }

    private isValidEmail(email: string): boolean {
        // Logique de validation d'email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}