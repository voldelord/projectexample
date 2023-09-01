import { Module } from '@nestjs/common';
import { DiscountcouponsService } from './discountcoupons.service';
import { DiscountcouponsController } from './discountcoupons.controller';
import { Discountcoupon } from './entities/discountcoupon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Discountcoupon])],
  controllers: [DiscountcouponsController],
  providers: [DiscountcouponsService],
})
export class DiscountcouponsModule {}
