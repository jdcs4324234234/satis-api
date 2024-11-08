import { Injectable } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRequest } from '../ticket-request/ticket-request';

@Injectable()
export class RequirementsRepository {
    constructor(
        @InjectRepository(TicketRequest)
        private readonly ticketRequestRepository: Repository<TicketRequest>,
    ) {}

    async getRequirementsperState(): Promise<any> {

        const statuses = [
            'approved', 'assigned', 'closed', 'dispatched', 'escalated_tto', 
            'escalated_ttr', 'new', 'pending', 'redispatched', 'rejected', 
            'resolved', 'waiting_for_approval'
        ];

        const counts = await Promise.all(
            statuses.map(status => this.ticketRequestRepository.count({ where: { status } }))
        );

        const total = counts.reduce((acc, count) => acc + count, 0);
        
        const result = statuses.reduce((acc, status, index) => {
            acc[status] = counts[index];
            return acc;
        }, {});

        return {
            ...result,
            total,
        };
    
    }


    async getImplementationPercentage(): Promise<any> {
        const statuses = [
            'approved', 'assigned', 'closed', 'dispatched', 'escalated_tto', 
            'escalated_ttr', 'new', 'pending', 'redispatched', 'rejected', 
            'resolved', 'waiting_for_approval'
        ];
    
        const queryBuilder = this.ticketRequestRepository.createQueryBuilder('ticket')
            .select('ticket.service_id', 'service_id')
            .addSelect('service.name', 'service_name')
            .addSelect('ticket.status', 'status')
            .addSelect('COUNT(ticket.id)', 'count')
            .innerJoin('service', 'service', 'service.id = ticket.service_id')
            .where('ticket.status IN (:...statuses)', { statuses })
            .groupBy('ticket.service_id')
            .addGroupBy('ticket.status')
            .addGroupBy('service.name');
    
        const rawResults = await queryBuilder.getRawMany();
    
        const result = {};
        rawResults.forEach(row => {
            const serviceId = row.service_id;
            const serviceName = row.service_name;
            const status = row.status;
            const count = parseInt(row.count, 10);
    
            if (!result[serviceId]) {
                result[serviceId] = {
                    serviceName,
                    counts: {},
                    total: 0,
                    percentage: 0,
                };
            }
    
            result[serviceId].counts[status] = count;
            result[serviceId].total += count;
        });
    

        for (const serviceId in result) {
            const closedCount = result[serviceId].counts['closed'] || 0;
            const resolvedCount = result[serviceId].counts['resolved'] || 0;
            const total = result[serviceId].total;
    
            result[serviceId].percentage = total > 0 ? ((closedCount + resolvedCount) / total) * 100 : 0;
        }
    
        return result;
    }
    

    async getResolutionMetrics(): Promise<any> {
        const tickets = await this.ticketRequestRepository.find({
            where: { resolution_date: Not(IsNull()) },
            select: ['request_type', 'impact', 'priority', 'urgency', 
                'origin', 'assignment_date', 'resolution_date', 'resolution_code'],
        });
    
        if (tickets.length === 0) {
            return {
                averageResolutionTime: 0,
                mostFrequentResolutionType: null,
                resolutionTypeFrequency: {},
                details: [],
            };
        }
    
        type GroupedMetric = {
            request_type: string;
            impact: number;
            priority: number;
            urgency: number;
            origin: string;
            totalResolutionTime: number;
            count: number;
            resolutionCodes: Record<string, number>;
        };
    

        const groupedMetrics: Record<string, GroupedMetric> = {};
        const resolutionCounts: Record<string, number> = {};
    
        tickets.forEach(ticket => {

            const resolutionTime = (new Date(ticket.resolution_date).getTime() 
                - new Date(ticket.assignment_date).getTime()) / (1000 * 60 * 60);
    

            const key = `${ticket.request_type}-${ticket.impact}-${ticket.priority}
                -${ticket.urgency}-${ticket.origin}`;
            

            if (!groupedMetrics[key]) {
                groupedMetrics[key] = {
                    request_type: ticket.request_type,
                    impact: Number(ticket.impact),
                    priority: Number(ticket.priority),
                    urgency: Number(ticket.urgency),
                    origin: ticket.origin,
                    totalResolutionTime: 0,
                    count: 0,
                    resolutionCodes: {},
                };
            }
    
            groupedMetrics[key].totalResolutionTime += resolutionTime;
            groupedMetrics[key].count += 1;
    
            groupedMetrics[key].resolutionCodes[ticket.resolution_code] = 
                (groupedMetrics[key].resolutionCodes[ticket.resolution_code] || 0) + 1;
    
            resolutionCounts[ticket.resolution_code] = (resolutionCounts[ticket.resolution_code] || 0) + 1;
        });
    
        const details = Object.values(groupedMetrics).map(group => {
            const mostFrequentResolutionType = Object.keys(group.resolutionCodes).reduce((a, b) => 
                group.resolutionCodes[a] > group.resolutionCodes[b] ? a : b
            );
    
            return {
                request_type: group.request_type,
                impact: group.impact,
                priority: group.priority,
                urgency: group.urgency,
                origin: group.origin,
                averageResolutionTime: group.totalResolutionTime / group.count,
                mostFrequentResolutionType,
            };
        });
    
        const mostFrequentResolutionType = Object.keys(resolutionCounts).reduce((a, b) => 
            resolutionCounts[a] > resolutionCounts[b] ? a : b
        );
    

        const totalResolutionTime = tickets.reduce((acc, ticket) => {
            const resolutionTime = (new Date(ticket.resolution_date).getTime() 
                - new Date(ticket.assignment_date).getTime()) / (1000 * 60 * 60);
            return acc + resolutionTime;
        }, 0);
        const averageResolutionTime = totalResolutionTime / tickets.length;
    
        return {
            averageResolutionTime,
            mostFrequentResolutionType,
            resolutionTypeFrequency: resolutionCounts,
            details,
        };
    }
}
