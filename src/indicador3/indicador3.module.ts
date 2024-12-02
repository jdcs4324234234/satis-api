import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicador3Repository } from './indicador3.repository'; 
import { Indicador3Service } from './indicador3.service';
import { Indicador3Controller } from './indicador3.controller';
import { TicketRequest } from 'src/ticket-request/ticket-request';

@Module({
    imports: [TypeOrmModule.forFeature([TicketRequest])],
    controllers: [Indicador3Controller],
    providers: [Indicador3Service, Indicador3Repository], 
})
export class Indicador3Module {}
