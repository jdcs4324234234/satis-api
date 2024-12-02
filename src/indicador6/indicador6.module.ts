import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicador6Service } from './indicador6.service';
import { Indicador6Controller } from './indicador6.controller';
import { WorkOrder } from '../entities/workorder.entity';
import { TicketRequest } from '../entities/ticket_request.entity';
import { Ticket } from '../entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrder, TicketRequest, Ticket])],
  controllers: [Indicador6Controller],
  providers: [Indicador6Service],
})
export class Indicador6Module {}
