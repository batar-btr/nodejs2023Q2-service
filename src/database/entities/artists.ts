import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

export class Artists {
  artists: Map<string, Artist>;

  constructor() {
    this.artists = new Map();
  }

  getAllArtists() {
    return [...this.artists.values()];
  }

  createArtist(dto: CreateArtistDto) {
    const id = uuidv4();
    const newArtist = { id, ...dto };
    this.artists.set(id, newArtist);
    return newArtist;
  }

  getArtistById(id: string) {
    return this.artists.get(id);
  }

  updateArtist(id: string, dto: UpdateArtistDto) {
    const artist = this.artists.get(id);
    const updatedArtist = { ...artist, ...dto };
    this.artists.set(id, updatedArtist);
    return updatedArtist;
  }

  delete(id: string) {
    this.artists.delete(id);
    return null;
  }

  isArtistExist(id: string) {
    return this.artists.has(id);
  }
}
