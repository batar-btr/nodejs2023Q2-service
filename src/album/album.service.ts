import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prismaService.album.create({ data: createAlbumDto });
  }

  async findAll() {
    return await this.prismaService.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (album) {
      return album;
    } else {
      throw new NotFoundException(`Album with ID: ${id} doesn't exist`);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (album) {
      return this.prismaService.album.update({
        where: { id },
        data: updateAlbumDto,
      });
    } else {
      throw new NotFoundException(`Album with ID: ${id} doesn't exist`);
    }
  }

  async remove(id: string) {
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID: ${id} doesn't exist`);
    } else {
      await this.prismaService.album.delete({ where: { id } });
    }
  }
}
