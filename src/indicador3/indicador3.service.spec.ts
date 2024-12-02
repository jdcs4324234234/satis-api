import { Test, TestingModule } from '@nestjs/testing';
import { Indicador3Service } from './indicador3.service';

describe('Indicador3Service', () => {
  let service: Indicador3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Indicador3Service],
    }).compile();

    service = module.get<Indicador3Service>(Indicador3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
