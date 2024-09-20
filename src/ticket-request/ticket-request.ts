import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicketRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: [
        'approved',
        'assigned',
        'closed',
        'dispatched',
        'escalated_tto',
        'escalated_ttr',
        'new',
        'pending',
        'redispatched',
        'rejected',
        'resolved',
        'waiting_for_approval',
        ],
        default: 'new',
    })
    status: string;

    @Column({
        type: 'enum',
        enum: ['incident', 'service_request'],
        nullable: true,
    })
    request_type: string;

    @Column({ type: 'enum', enum: ['1', '2', '3'], default: '1' })
    impact: string;

    @Column({ type: 'enum', enum: ['1', '2', '3', '4'], default: '4' })
    priority: string;

    @Column({ type: 'enum', enum: ['1', '2', '3', '4'], default: '4' })
    urgency: string;

    @Column({
        type: 'enum',
        enum: ['mail', 'monitoring', 'phone', 'portal'],
        default: 'phone',
    })
    origin: string;

    @Column({ default: 0 })
    approver_id: number;

    @Column({ default: 0 })
    service_id: number;

    @Column({ default: 0 })
    servicesubcategory_id: number;

    @Column({ type: 'enum', enum: ['no', 'yes'], default: 'no' })
    escalation_flag: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    escalation_reason: string;

    @Column({ type: 'datetime', nullable: true })
    assignment_date: Date;

    @Column({ type: 'datetime', nullable: true })
    resolution_date: Date;

    @Column({ type: 'datetime', nullable: true })
    last_pending_date: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    cumulatedpending_timespent: number;

    @Column({ type: 'datetime', nullable: true })
    cumulatedpending_started: Date;

    @Column({ type: 'datetime', nullable: true })
    cumulatedpending_laststart: Date;

    @Column({ type: 'datetime', nullable: true })
    cumulatedpending_stopped: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    tto_timespent: number;

    @Column({ type: 'datetime', nullable: true })
    tto_started: Date;

    @Column({ type: 'datetime', nullable: true })
    tto_laststart: Date;

    @Column({ type: 'datetime', nullable: true })
    tto_stopped: Date;

    @Column({ type: 'datetime', nullable: true })
    tto_75_deadline: Date;

    @Column({ type: 'tinyint', unsigned: true, nullable: true })
    tto_75_passed: number;

    @Column({ type: 'tinyint', nullable: true })
    tto_75_triggered: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    tto_75_overrun: number;

    @Column({ type: 'datetime', nullable: true })
    tto_100_deadline: Date;

    @Column({ type: 'tinyint', unsigned: true, nullable: true })
    tto_100_passed: number;

    @Column({ type: 'tinyint', nullable: true })
    tto_100_triggered: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    tto_100_overrun: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    ttr_timespent: number;

    @Column({ type: 'datetime', nullable: true })
    ttr_started: Date;

    @Column({ type: 'datetime', nullable: true })
    ttr_laststart: Date;

    @Column({ type: 'datetime', nullable: true })
    ttr_stopped: Date;

    @Column({ type: 'datetime', nullable: true })
    ttr_75_deadline: Date;

    @Column({ type: 'tinyint', unsigned: true, nullable: true })
    ttr_75_passed: number;

    @Column({ type: 'tinyint', nullable: true })
    ttr_75_triggered: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    ttr_75_overrun: number;

    @Column({ type: 'datetime', nullable: true })
    ttr_100_deadline: Date;

    @Column({ type: 'tinyint', unsigned: true, nullable: true })
    ttr_100_passed: number;

    @Column({ type: 'tinyint', nullable: true })
    ttr_100_triggered: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    ttr_100_overrun: number;

    @Column({ type: 'int', unsigned: true, nullable: true })
    time_spent: number;

    @Column({
        type: 'enum',
        enum: [
        'assistance',
        'bug fixed',
        'hardware repair',
        'other',
        'software patch',
        'system update',
        'training',
        ],
        default: 'assistance',
    })
    resolution_code: string;

    @Column({ type: 'text', nullable: true })
    solution: string;

    @Column({ type: 'text', nullable: true })
    pending_reason: string;

    @Column({ default: 0 })
    parent_request_id: number;

    @Column({ default: 0 })
    parent_problem_id: number;

    @Column({ default: 0 })
    parent_change_id: number;

    @Column({ type: 'longtext', nullable: true })
    public_log: string;

    @Column({ type: 'blob', nullable: true })
    public_log_index: Buffer;

    @Column({ type: 'enum', enum: ['1', '2', '3', '4'], default: '1' })
    user_satisfaction: string;

    @Column({ type: 'text', nullable: true })
    user_commment: string;
}
