import { Trim } from 'class-sanitizer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsDate,
  MinLength,
  IsDateString,
} from 'class-validator';

export class CreateUpdateAppointmentDto {
  @IsString()
  public readonly title: string;

  @IsDateString()
  public readonly start: Date;

  @IsDateString()
  public readonly end: Date;
}
