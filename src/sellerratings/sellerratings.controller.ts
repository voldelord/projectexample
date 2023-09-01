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
import { CreateSellerRatingDto } from './dto/create-sellerrating.dto';
import { SellerRatingsService } from './sellerratings.service';
import { SellerRating } from './entities/sellerrating.entity';
import { UpdateSellerRatingDto } from './dto/update-sellerrating.dto';

@Controller('sellerratings')
export class SellerRatingsController {
  constructor(private sellerRatingsService: SellerRatingsService) {}

  @Get()
  getSellerRatings(): Promise<SellerRating[]> {
    return this.sellerRatingsService.getSellerRatings();
  }

  @Get(':id')
  getSellerRating(@Param('id', ParseIntPipe) id: number) {
    return this.sellerRatingsService.getSellerRating(id);
  }

  @Post()
  createSellerRating(@Body() newSellerRating: CreateSellerRatingDto) {
    return this.sellerRatingsService.createSellerRating(newSellerRating);
  }

  @Delete(':id')
  deleteSellerRating(@Param('id', ParseIntPipe) id: number) {
    return this.sellerRatingsService.deleteSellerRating(id);
  }

  @Patch(':id')
  updateSellerRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() sellerRating: UpdateSellerRatingDto,
  ) {
    return this.sellerRatingsService.updateSellerRating(id, sellerRating);
  }
}
