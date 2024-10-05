import { Test, TestingModule } from '@nestjs/testing';
import { Indicador4Controller } from './indicador4.controller';

describe('Indicador4Controller', () => {
  let controller: Indicador4Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Indicador4Controller],
    }).compile();

    controller = module.get<Indicador4Controller>(Indicador4Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
