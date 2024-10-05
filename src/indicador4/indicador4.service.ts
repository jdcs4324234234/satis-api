import { Injectable } from '@nestjs/common';
import { Indicador4Repository } from './indicador4.repository';

@Injectable()
export class Indicador4Service {
    constructor(private readonly indicador4Repository: Indicador4Repository) {}
    async getSatisfactionLevels() {
        return this.indicador4Repository.getSatisfactionLevels();
    }
}
