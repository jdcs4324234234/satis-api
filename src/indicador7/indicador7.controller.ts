import { Controller, Get } from '@nestjs/common';
import { Indicador7Service } from './indicador7.service';

@Controller('requirements')
export class Indicador7Controller {
    constructor(private readonly indicador7Service: Indicador7Service) {}

    @Get('indicador7')
    async getImplementationPercentage() {
        return this.indicador7Service.getImplementationPercentage();
    }

    @Get('indicador2')
    async getRequirementsperState() {
        return this.indicador7Service.getRequirementsperState();
    }

    @Get('indicador1')
    async getResolutionMetrics() {
        return this.indicador7Service.getResolutionMetrics();
    }
}
