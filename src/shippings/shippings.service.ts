import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipping } from './entities/shipping.entity';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Injectable()
export class ShippingsService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
  ) {}

  async createShipping(shipping: CreateShippingDto) {
    const newShipping = this.shippingRepository.create(shipping);
    return this.shippingRepository.save(newShipping);
  }

  getShippings() {
    return this.shippingRepository.find();
  }

  async getShipping(id: number) {
    const shippingFound = await this.shippingRepository.findOne({
      where: {
        id,
      },
    });

    if (!shippingFound) {
      return new HttpException('Shipping Not Found', HttpStatus.NOT_FOUND);
    }
    return shippingFound;
  }

  async deleteShipping(id: number) {
    const result = await this.shippingRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Shipping not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateShipping(id: number, shipping: UpdateShippingDto) {
    const shippingFound = await this.shippingRepository.findOne({
      where: {
        id,
      },
    });

    if (!shippingFound) {
      return new HttpException('Shipping Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedShipping = Object.assign(shippingFound, shipping);
    return this.shippingRepository.save(updatedShipping);
  }
}
