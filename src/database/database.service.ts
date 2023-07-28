import { Injectable } from '@nestjs/common';
import { Users } from './users';

@Injectable()
export class DatabaseService {
  users: Users;
  constructor() {
    this.users = new Users();
  }
}
