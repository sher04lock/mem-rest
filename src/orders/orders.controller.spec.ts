import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MockedOrderModelProvider } from './orders.service.spec';

describe('Orders Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        MockedOrderModelProvider
      ]
    }).compile();
  });

  it('should be defined', () => {
    let controller = module.get<OrdersController>(OrdersController);
    expect(controller).toBeDefined();
  });
});
