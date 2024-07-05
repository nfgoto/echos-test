import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from 'src/users/models/user.schema';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(pseudonyme: string, pass: string) {
        const user = await this.usersService.findOne(pseudonyme);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: UserDocument) {
        const payload = { pseudonyme: user.pseudonyme, sub: user._id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateJwtPayload(payload: JwtPayload) {
        return await this.usersService.findOne(payload.pseudonyme);
    }
}