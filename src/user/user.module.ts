import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabaseModule, PrismaModule],
})
export class UserModule {}
