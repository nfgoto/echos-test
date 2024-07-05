import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

// TODO: use a configuration module to retrieve env vars
const secretKey = process.env.JWT_KEY || "neJamaisMettreDesDecretsDansLeCode";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateJwtPayload(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}