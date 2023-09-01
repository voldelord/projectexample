import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async createOrder(order: CreateOrderDto) {
    const newOrder = this.orderRepository.create(order);
    return this.orderRepository.save(newOrder);
  }

  getOrders() {
    return this.orderRepository.find();
  }

  async getOrder(id: number) {
    const orderFound = await this.orderRepository.findOne({
      where: {
        id,
      },
    });

    if (!orderFound) {
      return new HttpException('Order Not Found', HttpStatus.NOT_FOUND);
    }
    return orderFound;
  }

  async deleteOrder(id: number) {
    const result = await this.orderRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateOrder(id: number, order: UpdateOrderDto) {
    const orderFound = await this.orderRepository.findOne({
      where: {
        id,
      },
    });

    if (!orderFound) {
      return new HttpException('Order Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedOrder = Object.assign(orderFound, order);
    return this.orderRepository.save(updatedOrder);
  }
}
