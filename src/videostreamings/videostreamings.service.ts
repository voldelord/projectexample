import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Videostreaming } from './entities/videostreaming.entity';
import { CreateVideostreamingDto } from './dto/create-videostreaming.dto';
import { UpdateVideostreamingDto } from './dto/update-videostreaming.dto';

@Injectable()
export class VideostreamingService {
  constructor(
    @InjectRepository(Videostreaming)
    private videostreamingRepository: Repository<Videostreaming>,
  ) {}

  async createVideostreaming(videostreamingDto: CreateVideostreamingDto) {
    const newVideostreaming =
      this.videostreamingRepository.create(videostreamingDto);
    return this.videostreamingRepository.save(newVideostreaming);
  }

  getVideostreamings() {
    return this.videostreamingRepository.find();
  }

  async getVideostreaming(id: number) {
    const videostreamingFound = await this.videostreamingRepository.findOne({
      where: {
        id,
      },
    });

    if (!videostreamingFound) {
      return new HttpException(
        'Video Streaming Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    return videostreamingFound;
  }

  async deleteVideostreaming(id: number) {
    const result = await this.videostreamingRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException(
        'Video Streaming not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async updateVideostreaming(
    id: number,
    videostreaming: UpdateVideostreamingDto,
  ) {
    const videostreamingFound = await this.videostreamingRepository.findOne({
      where: {
        id,
      },
    });

    if (!videostreamingFound) {
      return new HttpException(
        'Video Streaming Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedVideostreaming = Object.assign(
      videostreamingFound,
      videostreaming,
    );
    return this.videostreamingRepository.save(updatedVideostreaming);
  }
}
