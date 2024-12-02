// src/indicador6/indicador6.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class Indicador6Service {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  /**
   * Retrieves the count of tickets closed per team.
   * @returns An array of objects, where each object includes the team_id and the count of tickets closed by that team.
   */
  async getClosedTicketsByTeam(): Promise<any[]> {
    const results = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('ticket.team_id', 'team_id')
      .addSelect('COUNT(ticket.id)', 'cantidad')
      .where('ticket.operational_status = :status', { status: 'closed' })
      .groupBy('ticket.team_id')
      .getRawMany();

    return results.map(result => ({
      team_id: result.team_id,
      cantidad: parseInt(result.cantidad, 10),
    }));
  }
}
