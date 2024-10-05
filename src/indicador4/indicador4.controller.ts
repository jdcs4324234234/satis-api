import { Controller, Get } from '@nestjs/common';
import { Indicador4Service } from './indicador4.service';

@Controller('indicador4')
export class Indicador4Controller {
    constructor(private readonly indicador4Service: Indicador4Service) {}

    @Get()
    async getSatisfactionLevels() {
        return this.indicador4Service.getSatisfactionLevels();
    }
}
