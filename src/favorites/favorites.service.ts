import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async createFavorite(favorite: CreateFavoriteDto) {
    const newFavorite = this.favoriteRepository.create(favorite);
    return this.favoriteRepository.save(newFavorite);
  }

  getFavorites() {
    return this.favoriteRepository.find();
  }

  async getFavorite(id: number) {
    const favoriteFound = await this.favoriteRepository.findOne({
      where: {
        id,
      },
    });

    if (!favoriteFound) {
      return new HttpException('Favorite Not Found', HttpStatus.NOT_FOUND);
    }
    return favoriteFound;
  }

  async deleteFavorite(id: number) {
    const result = await this.favoriteRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateFavorite(id: number, favorite: UpdateFavoriteDto) {
    const favoriteFound = await this.favoriteRepository.findOne({
      where: {
        id,
      },
    });

    if (!favoriteFound) {
      return new HttpException('Favorite Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedFavorite = Object.assign(favoriteFound, favorite);
    return this.favoriteRepository.save(updatedFavorite);
  }
}
