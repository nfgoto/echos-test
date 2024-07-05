import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'pseudonyme' });
    }

    async validate(pseudonyme: string, password: string) {
        const user = await this.authService.validateUser(pseudonyme, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}