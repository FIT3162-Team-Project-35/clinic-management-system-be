import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Repository } from 'typeorm';
import { CreateUpdateAppointmentDto } from './appointment.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Patient } from '../patient/patient.entity';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class AppointmentService {
  @InjectRepository(Appointment)
  private readonly repository: Repository<Appointment>;
  @Inject(ConfigService)
  private readonly config: ConfigService;
  @Inject(PatientService)
  private readonly patientService: PatientService;

  constructor(private readonly httpService: HttpService) {}

  public async create(
    body: CreateUpdateAppointmentDto,
  ): Promise<Appointment | never> {
    const { patientId } = body;
    const patient: any = await this.patientService.findById(patientId);
    const ap = this.repository.create({ ...body, patient });
    // const patient = new Patient()
    // patient.id = body.patient

    return this.repository.save(ap);
  }

  public async findById(id: string): Promise<Appointment | never> {
    return this.repository.findOne({ where: { id: id } });
  }

  public async findAll(): Promise<Appointment[] | never> {
    return this.repository.find();
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async update(
    id: string,
    payload: CreateUpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment: Appointment = await this.repository.findOne({
      where: { id: id },
    });

    appointment.title = payload.title;
    appointment.start = payload.start;
    appointment.end = payload.end;

    return this.repository.save(appointment);
  }
}
