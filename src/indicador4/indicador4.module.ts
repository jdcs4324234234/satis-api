import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicador4Repository } from './indicador4.repository'; // Asegúrate de que la ruta sea correcta
import { Indicador4Service } from './indicador4.service';
import { Indicador4Controller } from './indicador4.controller';
import { TicketRequest } from 'src/ticket-request/ticket-request';

@Module({
    imports: [TypeOrmModule.forFeature([TicketRequest])],
    controllers: [Indicador4Controller],
    providers: [Indicador4Service, Indicador4Repository], 
})
export class Indicador4Module {}
