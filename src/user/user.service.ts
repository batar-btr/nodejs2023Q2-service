import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.create({ data: createUserDto });
    const { createdAt, updatedAt } = user;
    const responseUser = {
      ...user,
      createdAt: new Date(createdAt).valueOf(),
      updatedAt: new Date(updatedAt).valueOf(),
    };
    return plainToClass(User, responseUser);
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      throw new NotFoundException(`User with ID: ${id} doesn't exist`);
    }
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID: ${id} doesn't exist`);
    }

    const { password } = user;

    if (password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: { increment: 1 },
      },
    });

    const { createdAt, updatedAt } = updatedUser;

    const responseUser = {
      ...updatedUser,
      createdAt: new Date(createdAt).valueOf(),
      updatedAt: new Date(updatedAt).valueOf(),
    };

    return plainToClass(User, responseUser);
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID: ${id} doesn't exist`);
    } else {
      await this.prismaService.user.delete({ where: { id } });
    }
  }
}
