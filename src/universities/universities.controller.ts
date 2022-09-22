import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUniversities } from 'src/dtos/create-universities.dto';
import { UniversitiesService } from './universities.service';
import { UpdateUniversities } from '../dtos/update-universties.dto';
@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  async create(@Body() body: CreateUniversities) {
    return this.universitiesService.create(body);
  }

  @Get()
  async find() {
    return this.universitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return null;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUniversities) {
    return null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return null;
  }
}
