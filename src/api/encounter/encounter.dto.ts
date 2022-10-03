import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateUpdateEncounterDto {
  @IsString()
  public readonly diagnosis: string;

  @IsDateString()
  public readonly serviceDate: Date;

  @IsString()
  @IsOptional()
  public readonly additionalNotes: string;

  @IsString()
  public readonly patientId: string;

  @IsDateString()
  @IsOptional()
  public readonly nextAppointment: Date;

  @IsString()
  public readonly doctor: string;
}
