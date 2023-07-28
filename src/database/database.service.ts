import { Injectable } from '@nestjs/common';
import { Users } from './entities/users';
import { Tracks } from './entities/tracks';
import { Artists } from './entities/artists';
import { Albums } from './entities/albums';

@Injectable()
export class DatabaseService {
  users: Users;
  tracks: Tracks;
  artists: Artists;
  albums: Albums;
  constructor() {
    this.users = new Users();
    this.tracks = new Tracks();
    this.artists = new Artists();
    this.albums = new Albums();
  }
}
