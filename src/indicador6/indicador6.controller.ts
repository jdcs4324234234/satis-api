
import { Controller, Get } from '@nestjs/common';
import { Indicador6Service } from './indicador6.service';

@Controller('indicador5')
export class Indicador6Controller {
  constructor(private readonly indicador6Service: Indicador6Service) {}

  /**
   * Endpoint to get the count of closed tickets per team.
   * @returns A JSON array with team_id and the count of tickets closed by each team.
   */
  @Get('/')
  async getClosedTicketsByTeam() {
    return this.indicador6Service.getClosedTicketsByTeam();
  }
}
