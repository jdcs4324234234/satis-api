import { Injectable } from '@nestjs/common';
import { Indicador3Repository } from './indicador3.repository';

@Injectable()
export class Indicador3Service {
    constructor(private readonly indicador4Repository: Indicador3Repository) {}
    async getSatisfactionLevels() {
        return this.indicador4Repository.getSatisfactionLevels();
    }
}
