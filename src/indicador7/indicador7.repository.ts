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

        const statuses = [
            'approved', 'assigned', 'closed', 'dispatched', 'escalated_tto', 
            'escalated_ttr', 'new', 'pending', 'redispatched', 'rejected', 
            'resolved', 'waiting_for_approval'
        ];

        const counts = await Promise.all(
            statuses.map(status => this.ticketRequestRepository.count({ where: { status } }))
        );

        const total = counts.reduce((acc, count) => acc + count, 0);
        
        const closed = counts[statuses.indexOf('closed')];

        const resolved = counts[statuses.indexOf('resolved')];

        const percentage = ((closed + resolved) / total) * 100;

        const result = statuses.reduce((acc, status, index) => {
            acc[status] = counts[index];
            return acc;
        }, {});

        return {
            ...result,
            total,
            percentage,
        };
    
    }
}
