import { Module } from '@nestjs/common';
import { QueueConsumerService } from './queue-consumer/queue-consumer.service';
import { CommonModule } from '../common/common.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [CommonModule, OrdersModule],
  providers: [QueueConsumerService]
})
export class DataImporterModule { }
