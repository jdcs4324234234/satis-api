import { Controller, Get, Param } from '@nestjs/common';
import { TicketRequestService } from './ticket-request.service';
import { TicketRequest } from './ticket-request';

@Controller('ticket-requests')
export class TicketRequestController {
    constructor(private readonly ticketRequestService: TicketRequestService) {}

    @Get()
    findAll(): Promise<TicketRequest[]> {
        return this.ticketRequestService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<TicketRequest> {
        return this.ticketRequestService.findOne(id);
    }
}

