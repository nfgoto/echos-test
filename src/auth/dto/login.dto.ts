import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'Pseudonym of the user' })
    @IsString()
    @IsNotEmpty()
    pseudonyme: string;

    @ApiProperty({ description: 'Secure password for the user' })
    @IsString()
    @IsNotEmpty()
    password: string;
}