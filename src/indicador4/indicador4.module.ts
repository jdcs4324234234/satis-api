import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicador4Service } from './indicador4.service';
import { Indicador4Controller } from './indicador4.controller';
import { Ticket } from '../entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [Indicador4Controller],
  providers: [Indicador4Service],
})
export class Indicador4Module {}
