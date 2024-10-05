import { Controller, Get } from '@nestjs/common';
import { Indicador7Service } from './indicador7.service';

@Controller('indicador7')
export class Indicador7Controller {
    constructor(private readonly indicador7Service: Indicador7Service) {}

    @Get()
    async getImplementationPercentage() {
        return this.indicador7Service.getImplementationPercentage();
    }
}
