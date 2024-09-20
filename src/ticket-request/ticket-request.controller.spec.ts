import { Test, TestingModule } from '@nestjs/testing';
import { TicketRequestController } from './ticket-request.controller';

describe('TicketRequestController', () => {
  let controller: TicketRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketRequestController],
    }).compile();

    controller = module.get<TicketRequestController>(TicketRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
