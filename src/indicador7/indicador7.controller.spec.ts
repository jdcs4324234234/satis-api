import { Test, TestingModule } from '@nestjs/testing';
import { Indicador7Controller } from './indicador7.controller';
import { Indicador7Service } from './indicador7.service';

describe('Indicador7Controller', () => {
  let controller: Indicador7Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Indicador7Controller],
      providers: [Indicador7Service],
    }).compile();

    controller = module.get<Indicador7Controller>(Indicador7Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
