import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'Unique pseudonym of the user' })
    @IsString()
    @IsNotEmpty()
    pseudonyme: string;

    @ApiProperty({ description: 'Secure password for the user' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'Name of the user', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Postal address of the user', required: false })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ description: 'Comment about the user', required: false })
    @IsString()
    @IsOptional()
    comment?: string;

    @ApiProperty({ description: 'Role of the user', enum: ['admin', 'user'] })
    @IsString()
    @IsNotEmpty()
    @IsIn(['admin', 'user'])
    role: string;
}