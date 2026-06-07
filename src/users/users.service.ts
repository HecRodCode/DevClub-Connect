import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Role } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) { }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }
    return user;
  }

  async create(name: string, email: string, phone: number, role: Role) {
    const emailExists = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (emailExists) {
      throw new BadRequestException(`The email ${email} is already in use`);
    }

    return await this.prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,
      },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); 
    await this.prisma.user.delete({
      where: { id },
    });

    return { message: `User with id ${id} successfully deleted` };
  }
}