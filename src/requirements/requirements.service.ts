import { Injectable } from '@nestjs/common';
import { RequirementsRepository } from './requirements.repository';

@Injectable()
export class RequirementsService {
    constructor(private readonly RequirementsRepository: RequirementsRepository) {}

    async getImplementationPercentage() {
        return this.RequirementsRepository.getImplementationPercentage();
    }

    async getRequirementsperState() {
        return this.RequirementsRepository.getRequirementsperState();
    }

    async getResolutionMetrics(filters) {
        return this.RequirementsRepository.getResolutionMetrics(filters);
    }
}
