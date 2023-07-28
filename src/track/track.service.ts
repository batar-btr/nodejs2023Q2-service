import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.databaseService.tracks.createTrack(createTrackDto);
  }

  findAll() {
    return this.databaseService.tracks.getAllTracks();
  }

  findOne(id: string) {
    if (this.databaseService.tracks.isTrackExist(id)) {
      return this.databaseService.tracks.getTrackById(id);
    } else {
      throw new NotFoundException(`Track with ID: ${id} doesn't exist`);
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (this.databaseService.tracks.isTrackExist(id)) {
      return this.databaseService.tracks.updateTrack(id, updateTrackDto);
    } else {
      throw new NotFoundException(`Track with ID: ${id} doesn't exist`);
    }
  }

  remove(id: string) {
    if (this.databaseService.tracks.isTrackExist(id)) {
      return this.databaseService.tracks.delete(id);
    } else {
      throw new NotFoundException(`Track with ID: ${id} doesn't exist`);
    }
  }
}
