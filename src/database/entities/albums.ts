import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

export class Albums {
  albums: Map<string, Album>;

  constructor() {
    this.albums = new Map();
  }

  getAllAlbums() {
    return [...this.albums.values()];
  }

  createAlbum(dto: CreateAlbumDto) {
    const id = uuidv4();
    const obj = {
      artistId: null,
    };
    const newAlbum = { ...obj, ...dto, id };
    this.albums.set(id, newAlbum);
    return newAlbum;
  }

  getAlbumById(id: string) {
    return this.albums.get(id);
  }

  updateAlbum(id: string, dto: UpdateAlbumDto) {
    const album = this.albums.get(id);
    const updatedAlbum = { ...album, ...dto };
    this.albums.set(id, updatedAlbum);
    return updatedAlbum;
  }

  delete(id: string) {
    this.albums.delete(id);
    return null;
  }

  isAlbumExist(id: string) {
    return this.albums.has(id);
  }
}
