import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerRating } from './entities/sellerrating.entity';
import { CreateSellerRatingDto } from './dto/create-sellerrating.dto';
import { UpdateSellerRatingDto } from './dto/update-sellerrating.dto';

@Injectable()
export class SellerRatingsService {
  constructor(
    @InjectRepository(SellerRating)
    private sellerRatingRepository: Repository<SellerRating>,
  ) {}

  async createSellerRating(sellerRating: CreateSellerRatingDto) {
    const newSellerRating = this.sellerRatingRepository.create(sellerRating);
    return this.sellerRatingRepository.save(newSellerRating);
  }

  getSellerRatings() {
    return this.sellerRatingRepository.find();
  }

  async getSellerRating(id: number) {
    const sellerRatingFound = await this.sellerRatingRepository.findOne({
      where: {
        id,
      },
    });

    if (!sellerRatingFound) {
      return new HttpException('Seller Rating Not Found', HttpStatus.NOT_FOUND);
    }
    return sellerRatingFound;
  }

  async deleteSellerRating(id: number) {
    const result = await this.sellerRatingRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Seller Rating not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateSellerRating(id: number, sellerRating: UpdateSellerRatingDto) {
    const sellerRatingFound = await this.sellerRatingRepository.findOne({
      where: {
        id,
      },
    });

    if (!sellerRatingFound) {
      return new HttpException('Seller Rating Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedSellerRating = Object.assign(sellerRatingFound, sellerRating);
    return this.sellerRatingRepository.save(updatedSellerRating);
  }
}
