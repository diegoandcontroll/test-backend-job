import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUniversities } from 'src/dtos/create-universities.dto';
import { UpdateUniversities } from 'src/dtos/update-universties.dto';
import { Universitie } from './interfaces/universities.interface';
type UniversitieType = {
  domains: string[];
  alpha_two_code: string;
  country: string;
  web_pages: string[];
  name: string;
  state_province: string;
};
@Injectable()
export class UniversitiesService {
  constructor(
    @Inject('UNIVERSITIES_MODEL')
    private universitieModel: Model<Universitie>,
    private readonly httpService: HttpService,
  ) {}

  async getUniversities() {
    try {
      const url = 'http://universities.hipolabs.com/search?country=argentina';
      const { data } = await this.httpService
        .get<UniversitieType[]>(url)
        .toPromise();
      return data.map((item) => item);
    } catch (err) {
      console.log(err);
    }
  }

  async create(createUniversities: CreateUniversities): Promise<Universitie> {
    const created = new this.universitieModel(createUniversities);
    const model = await this.universitieModel.find().exec();
    model.map((item) => {
      if (
        item.name === created.name &&
        item.country === created.country &&
        item.state_province === created.state_province
      ) {
        throw new HttpException('NAME EXIST', HttpStatus.BAD_REQUEST);
      }
    });
    return created.save();
  }

  async findAll(): Promise<Universitie[]> {
    return this.universitieModel
      .find()
      .select('name')
      .select('country')
      .select('state_province')
      .exec();
  }

  async findOne(id: string): Promise<Universitie> {
    return this.universitieModel.findById(id);
  }

  async update(id: string, data: UpdateUniversities): Promise<Universitie> {
    return await this.universitieModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return this.universitieModel.findByIdAndRemove(id);
  }
}
