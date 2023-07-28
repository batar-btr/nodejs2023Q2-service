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

  albumDelete(id: string) {
    const tracksFromAlbum = [...this.tracks.tracks.values()].filter(
      ({ albumId }) => albumId === id,
    );

    tracksFromAlbum.forEach(({ id }) => {
      const track = this.tracks.tracks.get(id);
      const updatedTrack = { ...track };
      updatedTrack.albumId = null;
      this.tracks.tracks.set(id, updatedTrack);
    });

    this.albums.delete(id);
  }

  artistDelete(id: string) {
    const artistTracks = [...this.tracks.tracks.values()].filter(
      ({ artistId }) => artistId === id,
    );

    const artistAlbums = [...this.albums.albums.values()].filter(
      ({ artistId }) => artistId === id,
    );

    artistTracks.forEach(({ id }) => {
      const track = this.tracks.tracks.get(id);
      const updatedTrack = { ...track };
      updatedTrack.artistId = null;
      this.tracks.tracks.set(id, updatedTrack);
    });

    artistAlbums.forEach(({ id }) => {
      const album = this.albums.albums.get(id);
      const updatedAlbum = { ...album };
      updatedAlbum.artistId = null;
      this.albums.albums.set(id, updatedAlbum);
    });

    this.artists.delete(id);
  }
}
