import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { DatabaseService } from 'src/database/database.service';
import { UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  getAllFavorites() {
    return this.databaseService.getAllFavorites();
  }

  addTrack(id: string) {
    if (this.databaseService.isTrackExist(id)) {
      return this.databaseService.favs.addTrack(id);
    } else {
      throw new UnprocessableEntityException(
        `Track with id: ${id} doesn't exist`,
      );
    }
  }

  removeTrack(id: string) {
    if (this.databaseService.favs.isTrackInFavorites(id)) {
      return this.databaseService.favs.deleteTrack(id);
    } else {
      throw new NotFoundException(`Track with ID: ${id} is not in favorites`);
    }
  }

  addAlbum(id: string) {
    if (this.databaseService.isAlbumExist(id)) {
      return this.databaseService.favs.addAlbum(id);
    } else {
      throw new UnprocessableEntityException(
        `Album with id: ${id} doesn't exist`,
      );
    }
  }

  removeAlbum(id: string) {
    if (this.databaseService.favs.isAlbumInFavorites(id)) {
      return this.databaseService.favs.deleteAlbum(id);
    } else {
      throw new NotFoundException(`Album with ID: ${id} is not in favorites`);
    }
  }

  addArtist(id: string) {
    if (this.databaseService.isArtistExist(id)) {
      return this.databaseService.favs.addArtist(id);
    } else {
      throw new UnprocessableEntityException(
        `Artist with id: ${id} doesn't exist`,
      );
    }
  }

  removeArtist(id: string) {
    if (this.databaseService.favs.isArtistInFavorites(id)) {
      return this.databaseService.favs.deleteArtist(id);
    } else {
      throw new NotFoundException(`Artist with ID: ${id} is not in favorites`);
    }
  }
}
