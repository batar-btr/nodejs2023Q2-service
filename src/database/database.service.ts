import { Injectable } from '@nestjs/common';
import { Users } from './users';
import { Tracks } from './tracks';

@Injectable()
export class DatabaseService {
  users: Users;
  tracks: Tracks;
  constructor() {
    this.users = new Users();
    this.tracks = new Tracks();
  }
}
