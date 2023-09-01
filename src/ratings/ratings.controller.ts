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
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';
import { Rating } from './entities/rating.entity';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Get()
  getRatings(): Promise<Rating[]> {
    return this.ratingsService.getRatings();
  }

  @Get(':id')
  getRating(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.getRating(id);
  }

  @Post()
  createRating(@Body() newRating: CreateRatingDto) {
    return this.ratingsService.createRating(newRating);
  }

  @Delete(':id')
  deleteRating(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.deleteRating(id);
  }

  @Patch(':id')
  updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() rating: UpdateRatingDto,
  ) {
    return this.ratingsService.updateRating(id, rating);
  }
}
