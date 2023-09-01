import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { RatingsModule } from './ratings/ratings.module';
import { ShippingsModule } from './shippings/shippings.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { SellerRatingsModule } from './sellerratings/sellerratings.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ReportsModule } from './reports/reports.module';
import { DiscountcouponsModule } from './discountcoupons/discountcoupons.module';
import { ShopsModule } from './shops/shops.module';
import { FavoritesModule } from './favorites/favorites.module';
import { VideostreamingsModule } from './videostreamings/videostreamings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mqttmosca',
      password: 'madara_25',
      database: 'apimarketplace',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    RatingsModule,
    ShippingsModule,
    NotificationsModule,
    PaymentsModule,
    SellerRatingsModule,
    PromotionsModule,
    ReportsModule,
    DiscountcouponsModule,
    ShopsModule,
    FavoritesModule,
    VideostreamingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
