import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prismaService.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prismaService.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (track) {
      return track;
    } else {
      throw new NotFoundException(`Track with ID: ${id} doesn't exist`);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (track) {
      return this.prismaService.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } else {
      throw new NotFoundException(`Track with ID: ${id} doesn't exist`);
    }
  }

  async remove(id: string) {
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track with ID: ${id} doesn't exist`);
    } else {
      await this.prismaService.track.delete({ where: { id } });
    }
  }
}
