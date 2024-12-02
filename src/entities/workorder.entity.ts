import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workorder')
export class WorkOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['closed', 'open'],
    default: 'open',
  })
  status: 'closed' | 'open';
}
