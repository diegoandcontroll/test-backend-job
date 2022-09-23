import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUniversities } from 'src/dtos/create-universities.dto';
import { PopulateUniversities } from 'src/dtos/populate-universities.dto';
import { UpdateUniversities } from 'src/dtos/update-universties.dto';
import { Universitie } from './interfaces/universities.interface';
type UniversitieType = {
  domains: [string];
  alpha_two_code: string;
  country: string;
  web_pages: [string];
  name: string;
  'state-province'?: string;
};
@Injectable()
export class UniversitiesService {
  constructor(
    @Inject('UNIVERSITIES_MODEL')
    private universitieModel: Model<Universitie>,
    private readonly httpService: HttpService,
  ) {}

  async populate(region: PopulateUniversities) {
    try {
      const url = `http://universities.hipolabs.com/search?country=${region.country.toLowerCase()}`;
      const { data } = await this.httpService
        .get<UniversitieType[]>(url)
        .toPromise();
      data.map(async (item) => {
        const created = new this.universitieModel(item);
        await created.save();
      });
      return data;
    } catch (err) {
      throw new HttpException('ERROR TO POPULATE', HttpStatus.BAD_REQUEST);
    }
  }

  async create(createUniversities: CreateUniversities): Promise<Universitie> {
    createUniversities.country = createUniversities.country.toLowerCase();
    const created = new this.universitieModel(createUniversities);
    const model = await this.universitieModel.find().exec();
    model.map((item) => {
      if (
        item.name === created.name &&
        item.country === created.country &&
        item['state-province'] === created['state-province']
      ) {
        throw new HttpException('NAME EXIST', HttpStatus.BAD_REQUEST);
      }
    });
    return created.save();
  }

  async findAll(): Promise<Universitie[]> {
    return await this.universitieModel
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
