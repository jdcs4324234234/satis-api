import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRequest } from '../ticket-request/ticket-request';

@Injectable()
export class Indicador7Repository {
    constructor(
        @InjectRepository(TicketRequest)
        private readonly ticketRequestRepository: Repository<TicketRequest>,
    ) {}

    async getImplementationPercentage(): Promise<any> {
        const closed = await this.ticketRequestRepository.count({
            where: { status: 'closed' },
        });

        const resolved = await this.ticketRequestRepository.count({
            where: { status: 'resolved' },
        });

        const total = await this.ticketRequestRepository.count({});

        const percentage =  ((closed+resolved)/total) * 100;

        return {
            closed,
            resolved,
            total,
            percentage,
        };
    }
}
