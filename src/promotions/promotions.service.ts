import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async createPromotion(promotion: CreatePromotionDto) {
    const newPromotion = this.promotionRepository.create(promotion);
    return this.promotionRepository.save(newPromotion);
  }

  getPromotions() {
    return this.promotionRepository.find();
  }

  async getPromotion(id: number) {
    const promotionFound = await this.promotionRepository.findOne({
      where: {
        id,
      },
    });

    if (!promotionFound) {
      return new HttpException('Promotion Not Found', HttpStatus.NOT_FOUND);
    }
    return promotionFound;
  }

  async deletePromotion(id: number) {
    const result = await this.promotionRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Promotion not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updatePromotion(id: number, promotion: UpdatePromotionDto) {
    const promotionFound = await this.promotionRepository.findOne({
      where: {
        id,
      },
    });

    if (!promotionFound) {
      return new HttpException('Promotion Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedPromotion = Object.assign(promotionFound, promotion);
    return this.promotionRepository.save(updatedPromotion);
  }
}
