import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';

@Injectable()
export class DatabaseService {
  users: Map<string, User>;
  constructor() {
    this.users = new Map();
  }

  createUser(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const id = uuidv4();
    const newUser = {
      id,
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.set(id, newUser);
    return plainToClass(User, newUser);
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { newPassword } = updatePasswordDto;
    const user = this.users.get(id);
    const updateUser = { ...user };
    updateUser.password = newPassword;
    updateUser.version += 1;
    updateUser.updatedAt = Date.now();
    this.users.set(id, updateUser);
    return plainToClass(User, updateUser);
  }

  getAllUsers() {
    return [...this.users.values()];
  }

  getUserById(id: string) {
    return plainToClass(User, this.users.get(id));
  }

  deleteUser(id: string) {
    this.users.delete(id);
    return null;
  }

  isUserExist(id: string) {
    return this.users.has(id);
  }
  isValidOldPass(id: string, oldPass: string) {
    const { password } = this.users.get(id);
    return password === oldPass;
  }
}
