import {
  Controller,
  Get,
  Post,
  UseGuards,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Req,
  Param,
  Delete,
  Put,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { Multer } from 'multer';
import { delay } from 'rxjs';

@Controller('patient')
export class PatientController {
  @Inject(PatientService)
  private readonly service: PatientService;

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private createPatient(
    @Body() body: CreatePatientDto,
  ): Promise<Patient | never> {
    console.log(123);
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  private findAll(): Promise<Patient[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  private findOne(@Param() params): Promise<Patient> {
    return this.service.findById(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  private delete(@Param() params) {
    return this.service.delete(params.id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  private update(@Param() params, @Body() body: UpdatePatientDto) {
    return this.service.update(params.id, body);
  }

  @Post('registration')
  @UseInterceptors(FileInterceptor('file'))
  private async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576 }),
          new FileTypeValidator({ fileType: 'jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const getUrl = await this.service.patientRegistration(file);
    //freeze 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const result = await this.service.getPatientRegistrationResult(getUrl);
    console.log(getUrl);
    console.log(result.analyzeResult.content.split('\n'));
  }
}
