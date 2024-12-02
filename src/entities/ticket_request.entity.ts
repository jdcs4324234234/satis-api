import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket_request')
export class TicketRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: [
      'approved', 'assigned', 'closed', 'dispatched', 'escalated_tto',
      'escalated_ttr', 'new', 'pending', 'redispatched', 'rejected',
      'resolved', 'waiting_for_approval'
    ],
    default: 'new',
  })
  status: string;
}
