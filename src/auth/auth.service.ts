import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Email is already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: dto.password,
        phone: dto.phone,
        role: dto.role ?? 'USER',
      },
    });

    return this.generateToken(user.id, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    return this.generateToken(user.id, user.role);
  }

  private generateToken(userId: number, role: string) {
    const payload = { sub: userId, role: role }; // 'sub' es el estándar para el ID del usuario
    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}
