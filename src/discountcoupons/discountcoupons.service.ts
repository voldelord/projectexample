import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discountcoupon } from './entities/discountcoupon.entity';
import { CreateDiscountcouponDto } from './dto/create-discountcoupon.dto';
import { UpdateDiscountcouponDto } from './dto/update-discountcoupon.dto';

@Injectable()
export class DiscountcouponsService {
  constructor(
    @InjectRepository(Discountcoupon)
    private discountcouponRepository: Repository<Discountcoupon>,
  ) {}

  async createDiscountcoupon(discountcoupon: CreateDiscountcouponDto) {
    const newDiscountcoupon =
      this.discountcouponRepository.create(discountcoupon);
    return this.discountcouponRepository.save(newDiscountcoupon);
  }

  getDiscountcoupons() {
    return this.discountcouponRepository.find();
  }

  async getDiscountcoupon(id: number) {
    const discountcouponFound = await this.discountcouponRepository.findOne({
      where: {
        id,
      },
    });

    if (!discountcouponFound) {
      return new HttpException(
        'Discount Coupon Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    return discountcouponFound;
  }

  async deleteDiscountcoupon(id: number) {
    const result = await this.discountcouponRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException(
        'Discount Coupon not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async updateDiscountcoupon(
    id: number,
    discountcoupon: UpdateDiscountcouponDto,
  ) {
    const discountcouponFound = await this.discountcouponRepository.findOne({
      where: {
        id,
      },
    });

    if (!discountcouponFound) {
      return new HttpException(
        'Discount Coupon Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedDiscountcoupon = Object.assign(
      discountcouponFound,
      discountcoupon,
    );
    return this.discountcouponRepository.save(updatedDiscountcoupon);
  }
}
