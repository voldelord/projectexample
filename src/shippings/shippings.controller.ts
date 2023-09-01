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
import { CreateShippingDto } from './dto/create-shipping.dto';
import { ShippingsService } from './shippings.service';
import { Shipping } from './entities/shipping.entity';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Controller('shippings')
export class ShippingsController {
  constructor(private shippingsService: ShippingsService) {}

  @Get()
  getShippings(): Promise<Shipping[]> {
    return this.shippingsService.getShippings();
  }

  @Get(':id')
  getShipping(@Param('id', ParseIntPipe) id: number) {
    return this.shippingsService.getShipping(id);
  }

  @Post()
  createShipping(@Body() newShipping: CreateShippingDto) {
    return this.shippingsService.createShipping(newShipping);
  }

  @Delete(':id')
  deleteShipping(@Param('id', ParseIntPipe) id: number) {
    return this.shippingsService.deleteShipping(id);
  }

  @Patch(':id')
  updateShipping(
    @Param('id', ParseIntPipe) id: number,
    @Body() shipping: UpdateShippingDto,
  ) {
    return this.shippingsService.updateShipping(id, shipping);
  }
}
