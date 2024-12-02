import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRequest } from './ticket-request';
import { TicketRequestService } from './ticket-request.service';
import { TicketRequestController } from './ticket-request.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TicketRequest])],
    controllers: [TicketRequestController],
    providers: [TicketRequestService],
    exports: [TicketRequestService],
})
export class TicketRequestModule {}
