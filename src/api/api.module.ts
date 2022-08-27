import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [UserModule, PatientModule],
})
export class ApiModule {}
