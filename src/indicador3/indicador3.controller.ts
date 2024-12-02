import { Controller, Get } from '@nestjs/common';
import { Indicador3Service } from './indicador3.service';

@Controller('indicador3')
export class Indicador3Controller {
    constructor(private readonly indicador3Service: Indicador3Service) {}

    @Get()
    async getSatisfactionLevels() {
        return this.indicador3Service.getSatisfactionLevels();
    }
}
