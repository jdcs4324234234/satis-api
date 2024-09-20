import { Test, TestingModule } from '@nestjs/testing';
import { TicketRequestService } from './ticket-request.service';

describe('TicketRequestService', () => {
  let service: TicketRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketRequestService],
    }).compile();

    service = module.get<TicketRequestService>(TicketRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
