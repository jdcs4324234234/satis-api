import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['closed', 'ongoing', 'resolved'],
    default: 'ongoing',
  })
  operational_status: 'closed' | 'ongoing' | 'resolved';

  @Column({ type: 'datetime', nullable: false })
  start_date: Date;

  @Column({ type: 'datetime', nullable: true }) 
  close_date: Date | null;

  @Column({ type: 'int', nullable: false })
  team_id: number;
}
