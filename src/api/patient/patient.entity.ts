import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar' })
  public firstName!: string;

  @Column({ type: 'varchar' })
  public lastName!: string;

  @Column({ type: 'varchar' })
  public contactNumber!: string;

  @Column({ type: 'varchar' })
  public gender!: string;

  @Column({ type: 'varchar', nullable: true })
  public address: string | null;

  @Column({ type: 'varchar', nullable: true })
  public city: string | null;

  @Column({ type: 'varchar', nullable: true })
  public postcode: string | null;

  @Column({ type: 'varchar', nullable: true })
  public dob: string | null;

  @Column({ type: 'varchar', nullable: true })
  public emergencyFirstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  public emergencyLastName: string | null;

  @Column({ type: 'varchar', nullable: true })
  public emergencyContact: string | null;

  @Column({ type: 'varchar', nullable: true })
  public emergencyRelationship: string | null;

  @Column({ type: 'varchar', nullable: true })
  public medicalDetails: string | null;

  @Column({ type: 'varchar', nullable: true })
  public allergicDetails: string | null;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
