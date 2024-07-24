import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from './roles/role.enum';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'The users have been successfully retrieved.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findAll() {
        return this.usersService.findAll();
    }

    @Get('me')
    @ApiOperation({ summary: 'Get the current user profile' })
    @ApiResponse({ status: 200, description: 'The user profile has been successfully retrieved.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getProfile(@Request() req) {
        return req.user;
    }

    @Get(':pseudonyme')
    @Roles(Role.ADMIN, Role.USER)
    @ApiOperation({ summary: 'Get a user by pseudonym' })
    @ApiResponse({ status: 200, description: 'The user has been successfully retrieved.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async findOne(@Param('pseudonyme') pseudonyme: string) {
        return this.usersService.findOne(pseudonyme);
    }

    @Patch('me')
    @Roles(Role.USER)
    @ApiOperation({ summary: 'Update the current user profile' })
    @ApiResponse({ status: 200, description: 'The user profile has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async updateMe(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(req.user.pseudonyme, updateUserDto);
    }

    @Patch(':pseudonyme')
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Update a user by pseudonym' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async update(@Param('pseudonyme') pseudonyme: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(pseudonyme, updateUserDto);
    }

    @Roles(Role.ADMIN)
    @Delete(':pseudonyme')
    @ApiOperation({ summary: 'Delete a user by pseudonym' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async remove(@Param('pseudonyme') pseudonyme: string) {
        return this.usersService.delete(pseudonyme);
    }
}