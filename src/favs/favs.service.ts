import { Injectable, NotFoundException } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';

class WithoutFavoritesId {
  @Exclude()
  favoritesId: string;
}

@Injectable()
export class FavsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllFavorites() {
    let favorites = await this.prismaService.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prismaService.favorites.create({ data: {} });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...res } = await this.prismaService.favorites.findFirst({
      include: {
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
      },
    });
    return res;
  }

  async addTrack(id: string) {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    let favorites = await this.prismaService.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prismaService.favorites.create({ data: {} });
    }
    if (track) {
      const result = await this.prismaService.track.update({
        where: { id },
        data: { favoritesId: favorites.id },
      });
      console.log(result);
      return result;
    } else {
      throw new UnprocessableEntityException(
        `Track with ID: ${id} doesn't exist`,
      );
    }
  }

  async removeTrack(id: string) {
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (track) {
      return await this.prismaService.track.update({
        where: { id },
        data: { favoritesId: null },
      });
    } else {
      throw new NotFoundException(`Track with ID: ${id} doesn't exist`);
    }
  }

  async addAlbum(id: string) {
    const album = await this.prismaService.album.findUnique({ where: { id } });
    let favorites = await this.prismaService.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prismaService.favorites.create({ data: {} });
    }

    if (album) {
      return await this.prismaService.album.update({
        where: { id },
        data: { favoritesId: favorites.id },
      });
    } else {
      throw new UnprocessableEntityException(
        `Album with ID: ${id} doesn't exist`,
      );
    }
  }

  async removeAlbum(id: string) {
    const album = await this.prismaService.album.findUnique({ where: { id } });

    if (album) {
      return await this.prismaService.album.update({
        where: { id },
        data: { favoritesId: null },
      });
    } else {
      throw new NotFoundException(`Album with ID: ${id} doesn't exist`);
    }
  }

  async addArtist(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });
    let favorites = await this.prismaService.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prismaService.favorites.create({ data: {} });
    }

    if (artist) {
      return await this.prismaService.artist.update({
        where: { id },
        data: { favoritesId: favorites.id },
      });
    } else {
      throw new UnprocessableEntityException(
        `artist with ID: ${id} doesn't exist`,
      );
    }
  }

  async removeArtist(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (artist) {
      return await this.prismaService.artist.update({
        where: { id },
        data: { favoritesId: null },
      });
    } else {
      throw new NotFoundException(`Artist with ID: ${id} doesn't exist`);
    }
  }
}
