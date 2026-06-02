import { IsString, IsEmail, IsNumber, IsEnum, MinLength } from 'class-validator';
import { Role } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsEmail()
  email!: string;

  @IsNumber()
  phone!: number;

  @IsEnum(Role)
  role!: Role;
}