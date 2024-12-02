import { Injectable } from '@nestjs/common';
import { In, IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRequest } from '../ticket-request/ticket-request';

@Injectable()
export class RequirementsRepository {
    constructor(
        @InjectRepository(TicketRequest)
        private readonly ticketRequestRepository: Repository<TicketRequest>,
    ) {}

    /**
     * The function `getRequirementsperState` retrieves the count of ticket requests per status and
     * calculates the total count.
     * @returns The `getRequirementsperState` function returns an object containing the count of ticket
     * requests for each status in the `statuses` array, as well as the total count of all ticket
     * requests. The object structure includes individual counts for each status key and a `total` key
     * with the sum of all counts.
     */
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


    /**
    * The function `getImplementationPercentage` calculates the percentage of closed and resolved
    * tickets for each service based on different statuses.
    * @returns The `getImplementationPercentage` function returns an object that contains information
    * about the implementation percentage for each service based on the ticket statuses. The object
    * structure includes service IDs as keys, with each service having properties for service name,
    * counts of different statuses, total count, and percentage of closed and resolved tickets out of
    * the total count.
    */
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
    

    /**
     * This TypeScript function asynchronously retrieves resolution metrics for tickets based on
     * optional filters.
     * @param {{ key: string; value: string[] }[]} [filters] - The `filters` parameter is an optional
     * array of objects, where each object has a `key` and `value` property. The `key` represents the
     * field on which you want to filter the data, and the `value` is an array of values to filter by.
     * @returns If no filters are provided or if the filters array is empty, the function will return
     * an object containing only the `globalMetrics`.
     */
    async getResolutionMetrics(filters?: { key: string; value: string[] }[]): Promise<any> {
        const baseWhereClause = { resolution_date: Not(IsNull()) };
        
        const allTickets = await this.fetchTickets(baseWhereClause);
        const globalMetrics = this.calculateMetrics(allTickets);
    
        if (!filters || filters.length === 0) {
            return { globalMetrics };
        }
    
        const filteredWhereClause = { ...baseWhereClause };
        
        filters.forEach(filter => {
            if (filter.value.length > 1) {
                filteredWhereClause[filter.key] = In(filter.value);
            } else {
                filteredWhereClause[filter.key] = filter.value[0];  
            }
        });
    
        const filteredTickets = await this.fetchTickets(filteredWhereClause);
        const filteredMetrics = this.calculateMetrics(filteredTickets);
    
        return { globalMetrics, filteredMetrics };
    }
    
    

/**
 * This TypeScript function fetches tickets from a repository based on a given where clause and returns
 * specific ticket properties.
 * @param {any} whereClause - The `whereClause` parameter in the `fetchTickets` function is used to
 * specify the conditions that the tickets must meet in order to be retrieved from the database. It
 * allows you to filter the tickets based on specific criteria such as ticket status, ticket type, or
 * any other relevant attributes. The `
 * @returns An array of ticket objects that match the provided `whereClause` criteria, with selected
 * properties including `request_type`, `impact`, `priority`, `urgency`, `origin`, `assignment_date`,
 * `resolution_date`, and `resolution_code`.
 */
private async fetchTickets(whereClause: any): Promise<any[]> {
    return this.ticketRequestRepository.find({
        where: whereClause,
        select: [
            'request_type', 'impact', 'priority', 'urgency',
            'origin', 'assignment_date', 'resolution_date', 'resolution_code'
        ],
    });
}

/**
 * The function `calculateMetrics` calculates various metrics related to ticket resolution times and
 * types from a given array of tickets.
 * @param {any[]} tickets - The `calculateMetrics` function takes an array of `tickets` as input. Each
 * `ticket` object in the array should have properties `resolution_date`, `assignment_date`, and
 * `resolution_code`. The function calculates various metrics based on these properties, including
 * average resolution time, median resolution time, most
 * @returns The `calculateMetrics` function returns an object with the following properties:
 * - `averageResolutionTime`: Average resolution time of the tickets.
 * - `medianResolutionTime`: Median resolution time of the tickets.
 * - `mostFrequentResolutionType`: The resolution code that appears most frequently.
 * - `resolutionTypeFrequency`: An object containing the frequency of each resolution code in the
 * tickets.
 */
    private calculateMetrics(tickets: any[]) {
        if (tickets.length === 0) return {
            averageResolutionTime: 0,
            medianResolutionTime: 0,
            mostFrequentResolutionType: null,
            resolutionTypeFrequency: {},
        };
    
        const resolutionCounts: Record<string, number> = {};
        const resolutionTimes: number[] = [];
    
        tickets.forEach(ticket => {
            const resolutionTime = (new Date(ticket.resolution_date).getTime()
                - new Date(ticket.assignment_date).getTime()) / (1000 * 60 * 60);
            resolutionTimes.push(resolutionTime);
            resolutionCounts[ticket.resolution_code] = (resolutionCounts[ticket.resolution_code] || 0) + 1;
        });
    
        const totalResolutionTime = resolutionTimes.reduce((acc, time) => acc + time, 0);
        const averageResolutionTime = totalResolutionTime / tickets.length;
        resolutionTimes.sort((a, b) => a - b);
        const middle = Math.floor(resolutionTimes.length / 2);
        const medianResolutionTime = resolutionTimes.length % 2 !== 0
            ? resolutionTimes[middle]
            : (resolutionTimes[middle - 1] + resolutionTimes[middle]) / 2;
    
        const mostFrequentResolutionType = Object.keys(resolutionCounts).reduce((a, b) =>
            resolutionCounts[a] > resolutionCounts[b] ? a : b
        );
    
        return {
            averageResolutionTime,
            medianResolutionTime,
            mostFrequentResolutionType,
            resolutionTypeFrequency: resolutionCounts,
        };
    }
}
