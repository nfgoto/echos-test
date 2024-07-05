import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthController } from './auth.controller';

// TODO: use a configuration module to retrieve env vars
const secretKey = process.env.JWT_KEY;

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }