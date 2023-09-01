import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
  ) {}

  async createShop(shop: CreateShopDto) {
    const newShop = this.shopRepository.create(shop);
    return this.shopRepository.save(newShop);
  }

  getShops() {
    return this.shopRepository.find();
  }

  async getShop(id: number) {
    const shopFound = await this.shopRepository.findOne({
      where: {
        id,
      },
    });

    if (!shopFound) {
      return new HttpException('Shop Not Found', HttpStatus.NOT_FOUND);
    }
    return shopFound;
  }

  async deleteShop(id: number) {
    const result = await this.shopRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateShop(id: number, shop: UpdateShopDto) {
    const shopFound = await this.shopRepository.findOne({
      where: {
        id,
      },
    });

    if (!shopFound) {
      return new HttpException('Shop Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedShop = Object.assign(shopFound, shop);
    return this.shopRepository.save(updatedShop);
  }
}
