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
import { CreateDiscountcouponDto } from './dto/create-discountcoupon.dto';
import { DiscountcouponsService } from './discountcoupons.service';
import { Discountcoupon } from './entities/discountcoupon.entity';
import { UpdateDiscountcouponDto } from './dto/update-discountcoupon.dto';

@Controller('discountcoupons')
export class DiscountcouponsController {
  constructor(private discountcouponsService: DiscountcouponsService) {}

  @Get()
  getDiscountcoupons(): Promise<Discountcoupon[]> {
    return this.discountcouponsService.getDiscountcoupons();
  }

  @Get(':id')
  getDiscountcoupon(@Param('id', ParseIntPipe) id: number) {
    return this.discountcouponsService.getDiscountcoupon(id);
  }

  @Post()
  createDiscountcoupon(@Body() newDiscountcoupon: CreateDiscountcouponDto) {
    return this.discountcouponsService.createDiscountcoupon(newDiscountcoupon);
  }

  @Delete(':id')
  deleteDiscountcoupon(@Param('id', ParseIntPipe) id: number) {
    return this.discountcouponsService.deleteDiscountcoupon(id);
  }

  @Patch(':id')
  updateDiscountcoupon(
    @Param('id', ParseIntPipe) id: number,
    @Body() discountcoupon: UpdateDiscountcouponDto,
  ) {
    return this.discountcouponsService.updateDiscountcoupon(id, discountcoupon);
  }
}
