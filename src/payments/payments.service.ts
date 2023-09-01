import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(payment: CreatePaymentDto) {
    const newPayment = this.paymentRepository.create(payment);
    return this.paymentRepository.save(newPayment);
  }

  getPayments() {
    return this.paymentRepository.find();
  }

  async getPayment(id: number) {
    const paymentFound = await this.paymentRepository.findOne({
      where: {
        id,
      },
    });

    if (!paymentFound) {
      return new HttpException('Payment Not Found', HttpStatus.NOT_FOUND);
    }
    return paymentFound;
  }

  async deletePayment(id: number) {
    const result = await this.paymentRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updatePayment(id: number, payment: UpdatePaymentDto) {
    const paymentFound = await this.paymentRepository.findOne({
      where: {
        id,
      },
    });

    if (!paymentFound) {
      return new HttpException('Payment Not Found', HttpStatus.NOT_FOUND);
    }
    const updatedPayment = Object.assign(paymentFound, payment);
    return this.paymentRepository.save(updatedPayment);
  }
}
