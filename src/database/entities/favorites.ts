import { Favorites } from 'src/favs/entities/fav.entity';

export class Favs implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }

  addTrack(id: string): void {
    this.tracks.push(id);
  }
  addAlbum(id: string): void {
    this.albums.push(id);
  }
  addArtist(id: string): void {
    this.artists.push(id);
  }

  deleteTrack(id: string) {
    this.tracks = this.tracks.filter((trackId) => trackId !== id);
  }
  deleteAlbum(id: string) {
    this.albums = this.albums.filter((albumId) => albumId !== id);
  }
  deleteArtist(id: string) {
    this.artists = this.artists.filter((artistId) => artistId !== id);
  }

  isTrackInFavorites(id: string): boolean {
    return this.tracks.includes(id);
  }
  isAlbumInFavorites(id: string): boolean {
    return this.albums.includes(id);
  }
  isArtistInFavorites(id: string): boolean {
    return this.artists.includes(id);
  }
}
