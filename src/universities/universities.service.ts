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
    private readonly httpService2: HttpService,
  ) {}

  async populate(region: PopulateUniversities) {
    switch (await this.universitieModel.count()) {
      case 1021:
        throw new HttpException(
          'POPULATE ALL COUNTRYS',
          HttpStatus.BAD_REQUEST,
        );
      case 1022:
        throw new HttpException(
          'POPULATE ALL COUNTRYS',
          HttpStatus.BAD_REQUEST,
        );
      case 1023:
        throw new HttpException(
          'POPULATE ALL COUNTRYS',
          HttpStatus.BAD_REQUEST,
        );
      case 1024:
        throw new HttpException(
          'POPULATE ALL COUNTRYS',
          HttpStatus.BAD_REQUEST,
        );
      case 1025:
        throw new HttpException(
          'POPULATE ALL COUNTRYS',
          HttpStatus.BAD_REQUEST,
        );
      case 1026:
        throw new HttpException(
          'POPULATE ALL COUNTRYS',
          HttpStatus.BAD_REQUEST,
        );
    }
    if ((await this.universitieModel.count()) === 1020) {
      throw new HttpException('POPULATE ALL COUNTRYS', HttpStatus.BAD_REQUEST);
    } else {
      region.country.map(async (item) => {
        const url = `http://universities.hipolabs.com/search?country=${item}`;
        const { data } = await this.httpService
          .get<UniversitieType[]>(url)
          .toPromise();
        data.map(async (item) => {
          await this.universitieModel
            .insertMany([
              {
                name: item.name,
                'state-province': item['state-province'],
                country: item.country,
                web_pages: item.web_pages,
                domains: item.domains,
                alpha_two_code: item.alpha_two_code,
              },
            ])
            .then(() => console.log('Data Insert'))
            .catch((err) => console.log(err));
        });
      });
    }
  }

  async create(createUniversities: CreateUniversities): Promise<Universitie> {
    const created = new this.universitieModel(createUniversities);
    const model = await this.universitieModel.find().exec();
    model.map((item) => {
      if (
        item.name === created.name &&
        item.country === created.country &&
        item['state-province'] === created['state-province']
      ) {
        throw new HttpException('NAME EXIST', HttpStatus.CONFLICT);
      } else {
        return true;
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
