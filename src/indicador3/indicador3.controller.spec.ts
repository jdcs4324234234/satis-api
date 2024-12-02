import { Test, TestingModule } from '@nestjs/testing';
import { Indicador3Controller } from './indicador3.controller';

describe('Indicador3Controller', () => {
  let controller: Indicador3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Indicador3Controller],
    }).compile();

    controller = module.get<Indicador3Controller>(Indicador3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
