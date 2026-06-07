import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(Number(id));
    return user;
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    const user = this.usersService.create(
      body.name,
      body.email,
      body.phone,
      body.role,
    );
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.usersService.remove(Number(id));
    return result;
  }
}
