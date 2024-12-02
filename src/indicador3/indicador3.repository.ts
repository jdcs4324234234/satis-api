import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRequest } from '../ticket-request/ticket-request';

@Injectable()
export class Indicador3Repository {
    constructor(
        @InjectRepository(TicketRequest)
        private readonly ticketRequestRepository: Repository<TicketRequest>,
    ) {}

    /**
 * Retrieves the satisfaction levels of ticket requests and their respective counts.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of objects, each containing a satisfaction level and its total count.
 *
 * @example
 * [
 *   { user_satisfaction: '1', total: 10 },
 *   { user_satisfaction: '2', total: 20 },
 *   { user_satisfaction: '3', total: 30 },
 *   { user_satisfaction: '4', total: 40 }
 * ]
 */
    async getSatisfactionLevels(): Promise<any> {
        const satisfactionLevels = await this.ticketRequestRepository
            .createQueryBuilder('ticket_request')
            .select('ticket_request.user_satisfaction', 'user_satisfaction')
            .addSelect('COUNT(*)', 'total')
            .groupBy('ticket_request.user_satisfaction')
            .getRawMany();
    
        const allSatisfactionLevels = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        };
    
        satisfactionLevels.forEach(level => {
            allSatisfactionLevels[level.user_satisfaction] = parseInt(level.total, 10);
        });

        const result = Object.keys(allSatisfactionLevels).map(key => ({
            user_satisfaction: key,
            total: allSatisfactionLevels[key]
        }));
    
        return result;
    }
    
}

