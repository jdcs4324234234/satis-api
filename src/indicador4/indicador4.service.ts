
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class Indicador4Service {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  /**
 * This function retrieves the average resolution time and number of tickets closed per team
 * from a ticket repository.
 * @returns This function returns an array of objects, where each object represents the average
 * resolution time and the number of tickets closed for each team. The object structure includes the
 * team_id, tiempo_promedio (average resolution time in hours), and cantidad (number of tickets
 * closed).
 */
  async getAvgResolutionTimeByTeam(): Promise<any[]> {
    const results = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('ticket.team_id', 'team_id')
      .addSelect('COUNT(ticket.id)', 'count')
      .addSelect('AVG(TIMESTAMPDIFF(SECOND, ticket.start_date, ticket.close_date))', 'avg_resolution_time_seconds')
      .where('ticket.close_date IS NOT NULL')
      .groupBy('ticket.team_id')
      .getRawMany();

    return results.map(result => ({
      team_id: result.team_id,
      tiempo_promedio: (result.avg_resolution_time_seconds / 3600).toFixed(2), 
      cantidad: result.count,
    }));
  }
}
