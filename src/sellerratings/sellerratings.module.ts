import { Module } from '@nestjs/common';
import { SellerRatingsService } from './sellerratings.service';
import { SellerRatingsController } from './sellerratings.controller';
import { SellerRating } from './entities/sellerrating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SellerRating])],
  controllers: [SellerRatingsController],
  providers: [SellerRatingsService],
})
export class SellerRatingsModule {}
