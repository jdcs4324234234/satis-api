import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRequest } from '../ticket-request/ticket-request';

@Injectable()
export class Indicador4Repository {
    constructor(
        @InjectRepository(TicketRequest)
        private readonly ticketRequestRepository: Repository<TicketRequest>,
    ) {}

    async getSatisfactionLevels(): Promise<any> {
        return this.ticketRequestRepository
            .createQueryBuilder('ticket_request')
            .select('ticket_request.user_satisfaction', 'user_satisfaction')
            .addSelect('COUNT(*)', 'total')
            .groupBy('ticket_request.user_satisfaction')
            .getRawMany();
    }
}

