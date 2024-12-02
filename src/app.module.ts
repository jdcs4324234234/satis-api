import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRequestModule } from './ticket-request/ticket-request.module';
import { Indicador3Module } from './indicador3/indicador3.module'; 
import { TicketRequest } from './ticket-request/ticket-request';
import { RequirementsModule } from './requirements/requirements.module';
import { Indicador6Module } from './indicador6/indicador6.module'; 
import { Indicador4Module } from './indicador4/indicador4.module';
import { WorkOrder } from './entities/workorder.entity'; 
import { Ticket } from './entities/ticket.entity'; 
import { TicketRequest as TicketRequestEntity } from './entities/ticket_request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mysql',
      password: 'mysql',
      database: 'satis_v1',
      entities: [TicketRequest, WorkOrder, Ticket, TicketRequestEntity],
      synchronize: false,
    }),
    TicketRequestModule,
    Indicador3Module,
    RequirementsModule,
    Indicador6Module,
    Indicador4Module,  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
