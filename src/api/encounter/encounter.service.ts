import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Encounter } from './encounter.entity';
import { Repository } from 'typeorm';
import { CreateUpdateEncounterDto } from './encounter.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class EncounterService {
  @InjectRepository(Encounter)
  private readonly repository: Repository<Encounter>;
  @Inject(ConfigService)
  private readonly config: ConfigService;
  @Inject(PatientService)
  private readonly patientService: PatientService;

  constructor(private readonly httpService: HttpService) {}

  public async create(
    body: CreateUpdateEncounterDto,
  ): Promise<Encounter | never> {
    const { patientId } = body;
    const patient: any = await this.patientService.findById(patientId);
    const encounter = this.repository.create({ ...body, patient });

    return this.repository.save(encounter);
  }

  public async findById(id: string): Promise<Encounter | never> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['patient'],
    });
  }

  public async findAll(): Promise<Encounter[] | never> {
    return this.repository.find({
      relations: ['patient'],
    });
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async update(
    id: string,
    payload: CreateUpdateEncounterDto,
  ): Promise<Encounter> {
    const encounter: Encounter = await this.repository.findOne({
      where: { id: id },
    });
    const newPatient: any = await this.patientService.findById(
      payload.patientId,
    );

    encounter.diagnosis = payload.diagnosis;
    encounter.patient = newPatient;
    encounter.serviceDate = payload.serviceDate;
    encounter.nextAppointment = payload.nextAppointment;
    encounter.doctor = payload.doctor;

    return this.repository.save(encounter);
  }
}
