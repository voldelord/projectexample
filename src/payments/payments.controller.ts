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
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  getPayments(): Promise<Payment[]> {
    return this.paymentsService.getPayments();
  }

  @Get(':id')
  getPayment(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.getPayment(id);
  }

  @Post()
  createPayment(@Body() newPayment: CreatePaymentDto) {
    return this.paymentsService.createPayment(newPayment);
  }

  @Delete(':id')
  deletePayment(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.deletePayment(id);
  }

  @Patch(':id')
  updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() payment: UpdatePaymentDto,
  ) {
    return this.paymentsService.updatePayment(id, payment);
  }
}
