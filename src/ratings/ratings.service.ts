import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
  ) {}

  async createRating(rating: CreateRatingDto) {
    const newRating = this.ratingRepository.create(rating);
    return this.ratingRepository.save(newRating);
  }

  getRatings() {
    return this.ratingRepository.find();
  }

  async getRating(id: number) {
    const ratingFound = await this.ratingRepository.findOne({
      where: {
        id,
      },
    });

    if (!ratingFound) {
      return new HttpException('Rating Not Found', HttpStatus.NOT_FOUND);
    }
    return ratingFound;
  }

  async deleteRating(id: number) {
    const result = await this.ratingRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Rating not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateRating(id: number, rating: UpdateRatingDto) {
    const ratingFound = await this.ratingRepository.findOne({
      where: {
        id,
      },
    });

    if (!ratingFound) {
      return new HttpException('Rating Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedRating = Object.assign(ratingFound, rating);
    return this.ratingRepository.save(updatedRating);
  }
}
