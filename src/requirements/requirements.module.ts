import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRequest } from '../ticket-request/ticket-request';
import { RequirementsRepository } from './requirements.repository';
import { RequirementsService } from './requirements.service';
import { RequirementsController } from './requirements.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TicketRequest])],
    controllers: [RequirementsController],
    providers: [RequirementsService, RequirementsRepository],
})
export class RequirementsModule {}
