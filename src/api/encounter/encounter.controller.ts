import {
  Controller,
  Get,
  Post,
  UseGuards,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { EncounterService } from './encounter.service';
import { CreateUpdateEncounterDto } from './encounter.dto';
import { Encounter } from './encounter.entity';

@Controller('encounter')
export class EncounterController {
  @Inject(EncounterService)
  private readonly service: EncounterService;

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private createEncounter(
    @Body() body: CreateUpdateEncounterDto,
  ): Promise<Encounter | never> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  private findAll(): Promise<Encounter[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  private findOne(@Param() params): Promise<Encounter> {
    return this.service.findById(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  private delete(@Param() params) {
    return this.service.delete(params.id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  private update(@Param() params, @Body() body: CreateUpdateEncounterDto) {
    return this.service.update(params.id, body);
  }
}
