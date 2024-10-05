import { Injectable } from '@nestjs/common';
import { Indicador7Repository } from './indicador7.repository';

@Injectable()
export class Indicador7Service {
    constructor(private readonly indicador7Repository: Indicador7Repository) {}

    async getImplementationPercentage() {
        return this.indicador7Repository.getImplementationPercentage();
    }
}
