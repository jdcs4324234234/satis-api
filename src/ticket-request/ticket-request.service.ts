import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketRequest } from './ticket-request';

@Injectable()
export class TicketRequestService {
    constructor(
        @InjectRepository(TicketRequest)
        private ticketRequestRepository: Repository<TicketRequest>,
    ) {}

    findAll(): Promise<TicketRequest[]> {
        return this.ticketRequestRepository.find();
    }

    findOne(id: number): Promise<TicketRequest> {
        return this.ticketRequestRepository.findOneBy({ id });
    }
}
