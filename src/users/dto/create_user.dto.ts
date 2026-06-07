import {
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsString()
  password!: string;

  @IsEmail()
  email!: string;

  @IsNumber()
  phone!: number;

  @IsEnum(Role)
  role!: Role;
}
