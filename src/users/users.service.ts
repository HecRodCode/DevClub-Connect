import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User, Role } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no existe`);
    }
    return user;
  }

  create(name: string, email: string, phone: number, role: Role): User {
    const emailExists = this.users.some((user) => user.email === email);
    if (emailExists) {
      throw new BadRequestException(`El email ${email} ya está en uso`);
    }

    const newUser: User = {
      id: this.nextId++,
      name,
      email,
      phone,
      role,
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  remove(id: number): { message: string } {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`Usuario con id ${id} no existe`);
    }
    this.users.splice(index, 1);
    return { message: `Usuario con id ${id} eliminado exitosamente` };
  }
}
