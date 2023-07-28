import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    return this.databaseService.users.createUser(createUserDto);
  }

  findAll() {
    return this.databaseService.users.getAllUsers();
  }

  findOne(id: string) {
    if (this.databaseService.users.isUserExist(id)) {
      return this.databaseService.users.getUserById(id);
    } else {
      throw new NotFoundException(`User with ID: ${id} doesn't exist`);
    }
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword } = updatePasswordDto;

    if (!this.databaseService.users.isUserExist(id)) {
      throw new NotFoundException(`User with ID: ${id} doesn't exist`);
    }

    if (!this.databaseService.users.isValidOldPass(id, oldPassword)) {
      throw new ForbiddenException('Old password is wrong');
    }

    return this.databaseService.users.updateUser(id, updatePasswordDto);
  }

  remove(id: string) {
    if (this.databaseService.users.isUserExist(id)) {
      return this.databaseService.users.deleteUser(id);
    } else {
      throw new NotFoundException(`User with ID: ${id} doesn't exist`);
    }
  }
}
