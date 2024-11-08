import { Controller, Get } from '@nestjs/common';
import { RequirementsService } from './requirements.service';

@Controller('requirements')
export class RequirementsController {
    constructor(private readonly RequirementsService: RequirementsService) {}

    @Get('indicador7')
    async getImplementationPercentage() {
        return this.RequirementsService.getImplementationPercentage();
    }

    @Get('indicador2')
    async getRequirementsperState() {
        return this.RequirementsService.getRequirementsperState();
    }

    @Get('indicador1')
    async getResolutionMetrics() {
        return this.RequirementsService.getResolutionMetrics();
    }
}
