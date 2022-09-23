/* eslint-disable @typescript-eslint/ban-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateUniversities } from 'src/dtos/create-universities.dto';
import { UniversitiesService } from './universities.service';
import { UpdateUniversities } from '../dtos/update-universties.dto';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Universitie } from './interfaces/universities.interface';
import { PopulateUniversities } from 'src/dtos/populate-universities.dto';
@Controller('universities')
export class UniversitiesController {
  constructor(
    @Inject('UNIVERSITIES_MODEL')
    private universitieModel: Model<Universitie>,
    private readonly universitiesService: UniversitiesService,
  ) {}

  @Post()
  async create(@Body() body: CreateUniversities) {
    return this.universitiesService.create(body);
  }
  @Post('/region')
  async populate(@Body() body: PopulateUniversities) {
    return this.universitiesService.populate(body);
  }
  @Get()
  async find(@Req() req: Request) {
    let options: {};

    if (req.query.country) {
      options = {
        $or: [{ country: new RegExp(req.query.country.toString(), 'i') }],
      };
    }

    const query = this.universitieModel.find(options);

    const page: number = parseInt(req.query.page as any) || 1;
    const limit = parseInt(req.query.limit as any) || 20;
    const total = await this.universitieModel.count(options);

    const data = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.universitiesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUniversities) {
    return this.universitiesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.universitiesService.delete(id);
  }
}
