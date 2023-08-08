import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.prismaService.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return await this.prismaService.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(`Artist with ID: ${id} doesn't exist`);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (artist) {
      return this.prismaService.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } else {
      throw new NotFoundException(`Track with ID: ${id} doesn't exist`);
    }
  }

  async remove(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID: ${id} doesn't exist`);
    } else {
      await this.prismaService.artist.delete({ where: { id } });
    }
  }
}
