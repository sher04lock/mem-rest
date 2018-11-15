import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MockedOrderModelProvider } from './orders.service.spec';
import { MockedNotificationsProducerProvider } from '../common/notifications/notifications-producer/notifications-producer.service.spec';
import { CommonModule } from '../common/common.module';


describe('Orders Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        MockedOrderModelProvider,
        MockedNotificationsProducerProvider,
      ]
    }).compile();
  });

  it('should be defined', () => {
    let controller = module.get<OrdersController>(OrdersController);
    expect(controller).toBeDefined();
  });
});
