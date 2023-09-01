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
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopsService } from './shops.service';
import { Shop } from './entities/shop.entity';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get()
  getShops(): Promise<Shop[]> {
    return this.shopsService.getShops();
  }

  @Get(':id')
  getShop(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.getShop(id);
  }

  @Post()
  createShop(@Body() newShop: CreateShopDto) {
    return this.shopsService.createShop(newShop);
  }

  @Delete(':id')
  deleteShop(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.deleteShop(id);
  }

  @Patch(':id')
  updateShop(
    @Param('id', ParseIntPipe) id: number,
    @Body() shop: UpdateShopDto,
  ) {
    return this.shopsService.updateShop(id, shop);
  }
}
