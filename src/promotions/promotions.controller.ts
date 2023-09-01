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
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { PromotionsService } from './promotions.service';
import { Promotion } from './entities/promotion.entity';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Controller('promotions')
export class PromotionsController {
  constructor(private promotionsService: PromotionsService) {}

  @Get()
  getPromotions(): Promise<Promotion[]> {
    return this.promotionsService.getPromotions();
  }

  @Get(':id')
  getPromotion(@Param('id', ParseIntPipe) id: number) {
    return this.promotionsService.getPromotion(id);
  }

  @Post()
  createPromotion(@Body() newPromotion: CreatePromotionDto) {
    return this.promotionsService.createPromotion(newPromotion);
  }

  @Delete(':id')
  deletePromotion(@Param('id', ParseIntPipe) id: number) {
    return this.promotionsService.deletePromotion(id);
  }

  @Patch(':id')
  updatePromotion(
    @Param('id', ParseIntPipe) id: number,
    @Body() promotion: UpdatePromotionDto,
  ) {
    return this.promotionsService.updatePromotion(id, promotion);
  }
}
