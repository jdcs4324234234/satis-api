import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRequest } from '../ticket-request/ticket-request';
import { Indicador7Repository } from './indicador7.repository';
import { Indicador7Service } from './indicador7.service';
import { Indicador7Controller } from './indicador7.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TicketRequest])],
    controllers: [Indicador7Controller],
    providers: [Indicador7Service, Indicador7Repository],
})
export class Indicador7Module {}
