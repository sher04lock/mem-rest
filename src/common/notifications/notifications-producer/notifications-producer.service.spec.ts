import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsProducerService } from './notifications-producer.service';

export class MockedProducerService { }
export const MockedNotificationsProducerProvider = {
  provide: NotificationsProducerService,
  useClass: MockedProducerService
}


describe('NotificationsProducerService', () => {
  let service: NotificationsProducerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockedNotificationsProducerProvider
      ],
    }).compile();
    service = module.get<NotificationsProducerService>(NotificationsProducerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
