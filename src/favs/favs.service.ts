import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { DatabaseService } from 'src/database/database.service';
import { UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  create(createFavDto: CreateFavDto) {
    return 'This action adds a new fav';
  }

  findAll() {
    return this.databaseService.getAllFavorites();
  }

  findOne(id: number) {
    return `This action returns a #${id} fav`;
  }

  update(id: number, updateFavDto: UpdateFavDto) {
    return `This action updates a #${id} fav`;
  }

  remove(id: number) {
    return `This action removes a #${id} fav`;
  }
}
