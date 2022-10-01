import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from '../patient/patient.module';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), HttpModule, PatientModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
