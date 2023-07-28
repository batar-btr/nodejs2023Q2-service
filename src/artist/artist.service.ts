import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.databaseService.artists.createArtist(createArtistDto);
  }

  findAll() {
    return this.databaseService.artists.getAllArtists();
  }

  findOne(id: string) {
    if (this.databaseService.artists.isArtistExist(id)) {
      return this.databaseService.artists.getArtistById(id);
    } else {
      throw new NotFoundException(`Artist with ID: ${id} doesn't exist`);
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (this.databaseService.artists.isArtistExist(id)) {
      return this.databaseService.artists.updateArtist(id, updateArtistDto);
    } else {
      throw new NotFoundException(`Artist with ID: ${id} doesn't exist`);
    }
  }

  remove(id: string) {
    if (this.databaseService.artists.isArtistExist(id)) {
      return this.databaseService.artistDelete(id);
    } else {
      throw new NotFoundException(`Artist with ID: ${id} doesn't exist`);
    }
  }
}
