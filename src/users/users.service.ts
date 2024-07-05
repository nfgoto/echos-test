import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(pseudonyme: string): Promise<User | undefined> {
        return this.userModel.findOne({ pseudonyme }).exec();
    }

    async update(pseudonyme: string, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOneAndUpdate({ pseudonyme }, updateUserDto, { new: true });
        if (!existingUser) {
            throw new NotFoundException(`User ${pseudonyme} not found`);
        }
        return existingUser;
    }

    async delete(pseudonyme: string) {
        return this.userModel.deleteOne({ pseudonyme }).exec();
    }
}