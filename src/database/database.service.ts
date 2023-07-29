import { Injectable } from '@nestjs/common';
import { Users } from './entities/users';
import { Tracks } from './entities/tracks';
import { Artists } from './entities/artists';
import { Albums } from './entities/albums';
import { Favs } from './entities/favorites';
import { FavoritesResponse } from 'src/favs/entities/fav.entity';

@Injectable()
export class DatabaseService {
  users: Users;
  tracks: Tracks;
  artists: Artists;
  albums: Albums;
  favs: Favs;
  constructor() {
    this.users = new Users();
    this.tracks = new Tracks();
    this.artists = new Artists();
    this.albums = new Albums();
    this.favs = new Favs();
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

  getAllFavorites(): FavoritesResponse {
    return {
      artists: this.favs.artists.map((id) => this.artists.artists.get(id)),
      albums: this.favs.albums.map((id) => this.albums.albums.get(id)),
      tracks: this.favs.tracks.map((id) => this.tracks.tracks.get(id)),
    };
  }
  isTrackExist(id: string) {
    return this.tracks.tracks.has(id);
  }
  isAlbumExist(id: string) {
    return this.albums.albums.has(id);
  }
  isArtistExist(id: string) {
    return this.artists.artists.has(id);
  }
}
