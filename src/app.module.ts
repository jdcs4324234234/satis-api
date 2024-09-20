import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRequest } from './ticket-request/ticket-request';
import { TicketRequestService } from './ticket-request/ticket-request.service';
import { TicketRequestController } from './ticket-request/ticket-request.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mysql',
      password: 'mysql',
      database: 'satis_v1',
      entities: [TicketRequest],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TicketRequest]),
  ],
  controllers: [TicketRequestController],
  providers: [TicketRequestService],
})

export class AppModule {}
