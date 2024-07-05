import { IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ description: 'Secure password for the user', required: false })
    @IsString()
    @IsOptional()
    password?: string;

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

    @ApiProperty({ description: 'Role of the user', enum: ['admin', 'user'], required: false })
    @IsString()
    @IsOptional()
    @IsIn(['admin', 'user'])
    role?: string;
}