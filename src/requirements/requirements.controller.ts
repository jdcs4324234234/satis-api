import { Controller, Get, Query } from '@nestjs/common';
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
    async getResolutionMetrics(@Query() query: Record<string, string>) {
        const filters: { key: string, value: string[] }[] = [];
        
        for (let i = 1; query[`key${i}`] && query[`value${i}`]; i++) {
            const key = query[`key${i}`];
            const value = query[`value${i}`];
            
            const existingFilter = filters.find(filter => filter.key === key);
            if (existingFilter) {

                existingFilter.value.push(value);
            } else {

                filters.push({
                    key: key,
                    value: [value],  
                });
            }
        }
        return this.RequirementsService.getResolutionMetrics(filters.length ? filters : null);
    }
    
}
