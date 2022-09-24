import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [UserModule, PatientModule, AppointmentModule],
})
export class ApiModule {}
