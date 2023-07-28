import { Injectable } from '@nestjs/common';
import { Users } from './entities/users';
import { Tracks } from './entities/tracks';
import { Artists } from './entities/artists';

@Injectable()
export class DatabaseService {
  users: Users;
  tracks: Tracks;
  artists: Artists;
  constructor() {
    this.users = new Users();
    this.tracks = new Tracks();
    this.artists = new Artists();
  }
}
