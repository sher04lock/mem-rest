import { Test, TestingModule } from '@nestjs/testing';
import { QueueConsumerService } from './queue-consumer.service';
import { OrdersService } from '../../orders/orders.service';
import { MockedNotificationsProducerProvider } from '../../common/notifications/notifications-producer/notifications-producer.service.spec';
import { MockedOrderModelProvider } from '../../orders/orders.service.spec';

describe('QueueConsumerService', () => {
  let service: QueueConsumerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueConsumerService,
        { provide: "QueueConnection", useValue: {} },
        OrdersService,
        MockedOrderModelProvider,
        MockedNotificationsProducerProvider,
      ],
    }).compile();
    service = module.get<QueueConsumerService>(QueueConsumerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
