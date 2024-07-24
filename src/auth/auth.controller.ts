import { Controller, Request, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/users/models/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 201, description: 'The user has been successfully logged in.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  // can be handled on the frontend for statelessness by deleting the JWT token from the client
  // for more security on the backend, token blocklist / short expiration duration
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Log out' })
  @ApiResponse({ status: 201, description: 'The user has been successfully logged out.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('logout')
  async logout(@Req() req: Request & {user: User}): Promise<void> {
    await this.authService.logout(req.user.pseudonyme);
  }
}