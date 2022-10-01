import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar' })
  public title!: string;

  @Column({ type: 'timestamptz' })
  public start!: Date;

  @Column({ type: 'timestamptz' })
  public end!: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;
}
