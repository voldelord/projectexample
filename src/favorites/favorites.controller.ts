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
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): Promise<Favorite[]> {
    return this.favoritesService.getFavorites();
  }

  @Get(':id')
  getFavorite(@Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.getFavorite(id);
  }

  @Post()
  createFavorite(@Body() newFavorite: CreateFavoriteDto) {
    return this.favoritesService.createFavorite(newFavorite);
  }

  @Delete(':id')
  deleteFavorite(@Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.deleteFavorite(id);
  }

  @Patch(':id')
  updateFavorite(
    @Param('id', ParseIntPipe) id: number,
    @Body() favorite: UpdateFavoriteDto,
  ) {
    return this.favoritesService.updateFavorite(id, favorite);
  }
}
