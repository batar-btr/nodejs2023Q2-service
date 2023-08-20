import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DatabaseModule, PrismaModule],
})
export class TrackModule {}
