import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CreateVideostreamingDto } from './dto/create-videostreaming.dto';
import { VideostreamingService } from './videostreamings.service';
import { Videostreaming } from './entities/videostreaming.entity';
import { UpdateVideostreamingDto } from './dto/update-videostreaming.dto';

@Controller('videostreaming')
export class VideostreamingController {
  constructor(private videostreamingService: VideostreamingService) {}

  @Get()
  getVideostreamings(): Promise<Videostreaming[]> {
    return this.videostreamingService.getVideostreamings();
  }

  @Get(':id')
  getVideostreaming(@Param('id', ParseIntPipe) id: number) {
    return this.videostreamingService.getVideostreaming(id);
  }

  @Post()
  createVideostreaming(@Body() newVideostreaming: CreateVideostreamingDto) {
    return this.videostreamingService.createVideostreaming(newVideostreaming);
  }

  @Delete(':id')
  deleteVideostreaming(@Param('id', ParseIntPipe) id: number) {
    return this.videostreamingService.deleteVideostreaming(id);
  }

  @Patch(':id')
  updateVideostreaming(
    @Param('id', ParseIntPipe) id: number,
    @Body() videostreaming: UpdateVideostreamingDto,
  ) {
    return this.videostreamingService.updateVideostreaming(id, videostreaming);
  }
}
