import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Bartek:plokm123@mango-mongo-cluster-yrv4a.mongodb.net/test?retryWrites=true"),
    OrdersModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
