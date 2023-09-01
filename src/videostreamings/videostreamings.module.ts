import { Module } from '@nestjs/common';
import { VideostreamingService } from './videostreamings.service';
import { VideostreamingController } from './videostreamings.controller';
import { Videostreaming } from './entities/videostreaming.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Videostreaming])],
  controllers: [VideostreamingController],
  providers: [VideostreamingService],
})
export class VideostreamingsModule {}
