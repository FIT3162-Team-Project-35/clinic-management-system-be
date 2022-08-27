import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
import { Request } from 'express';

@Injectable()
export class PatientService {
  @InjectRepository(Patient)
  private readonly repository: Repository<Patient>;

  public async create(body: CreatePatientDto): Promise<Patient | never> {
    return this.repository.save(body);
  }

  public async findById(id: string): Promise<Patient | never> {
    return this.repository.findOne({ where: { id: id } });
  }

  public async findAll(): Promise<Patient[] | never> {
    return this.repository.find();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async update(id: string, payload: UpdatePatientDto): Promise<Patient> {
    const patient: Patient = await this.repository.findOne({
      where: { id: id },
    });

    patient.firstName = payload.firstName;
    patient.lastName = payload.lastName;

    return this.repository.save(patient);
  }
}
