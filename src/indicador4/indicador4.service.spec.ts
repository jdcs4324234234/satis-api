import { Test, TestingModule } from '@nestjs/testing';
import { Indicador4Service } from './indicador4.service';

describe('Indicador4Service', () => {
  let service: Indicador4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Indicador4Service],
    }).compile();

    service = module.get<Indicador4Service>(Indicador4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
