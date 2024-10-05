import { Test, TestingModule } from '@nestjs/testing';
import { Indicador7Service } from './indicador7.service';

describe('Indicador7Service', () => {
  let service: Indicador7Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Indicador7Service],
    }).compile();

    service = module.get<Indicador7Service>(Indicador7Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
