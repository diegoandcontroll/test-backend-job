import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUniversities } from 'src/dtos/create-universities.dto';
import { Universitie } from './interfaces/universities.interface';

@Injectable()
export class UniversitiesService {
  constructor(
    @Inject('UNIVERSITIES_MODEL')
    private universitieModel: Model<Universitie>,
  ) {}

  async create(createUniversities: CreateUniversities): Promise<Universitie> {
    const created = new this.universitieModel(createUniversities);
    return created.save();
  }

  async findAll(): Promise<Universitie[]> {
    return this.universitieModel.find().exec();
  }
}
