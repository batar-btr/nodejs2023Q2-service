import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.databaseService.albums.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.databaseService.albums.getAllAlbums();
  }

  findOne(id: string) {
    if (this.databaseService.albums.isAlbumExist(id)) {
      return this.databaseService.albums.getAlbumById(id);
    } else {
      throw new NotFoundException(`Album with ID: ${id} doesn't exist`);
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (this.databaseService.albums.isAlbumExist(id)) {
      return this.databaseService.albums.updateAlbum(id, updateAlbumDto);
    } else {
      throw new NotFoundException(`Album with ID: ${id} doesn't exist`);
    }
  }

  remove(id: string) {
    if (this.databaseService.albums.isAlbumExist(id)) {
      return this.databaseService.albums.delete(id);
    } else {
      throw new NotFoundException(`Album with ID: ${id} doesn't exist`);
    }
  }
}
