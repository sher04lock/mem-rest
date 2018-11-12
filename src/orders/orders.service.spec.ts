import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';

const MockedOrdersRepository = {
  find() {
    return {};
  }
}

export const MockedOrderModelProvider = {
  provide: getModelToken("Order"),
  useValue: MockedOrdersRepository
}

describe('OrdersService', () => {
  let service: OrdersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        MockedOrderModelProvider
      ],
    }).compile();
    service = module.get<OrdersService>(OrdersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
