import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

export class Tracks {
  tracks: Map<string, Track>;

  constructor() {
    this.tracks = new Map();
  }

  getAllTracks() {
    return [...this.tracks.values()];
  }

  createTrack(dto: CreateTrackDto) {
    const id = uuidv4();
    const obj = {
      artistId: null,
      albumId: null,
    };
    const newTrack = { ...obj, ...dto, id };
    this.tracks.set(id, newTrack);
    return newTrack;
  }

  getTrackById(id: string) {
    return this.tracks.get(id);
  }

  updateTrack(id: string, dto: UpdateTrackDto) {
    const track = this.tracks.get(id);
    const updatedTrack = { ...track, ...dto };
    this.tracks.set(id, updatedTrack);
    return updatedTrack;
  }

  delete(id: string) {
    this.tracks.delete(id);
    return null;
  }

  isTrackExist(id: string) {
    return this.tracks.has(id);
  }
}
