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
    const saved = await this.universitieModel.find();
    let i = 0;
    try {
      for await (const doc of saved) {
        i = i + 1;
        region.country.map(async (linkUrl) => {
          const url = `http://universities.hipolabs.com/search?country=${linkUrl}`;
          const { data } = await this.httpService2
            .get<UniversitieType[]>(url)
            .toPromise()
            .finally(() => {
              return true;
            });

          for await (const item of data) {
            if (
              item.name === doc.name &&
              item.country === doc.country &&
              item['state-province'] === doc['state-province']
            ) {
              return null;
            }
          }
        });
      }
    } catch (err) {
      return null;
    }
    if (i <= 0) {
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

    return {
      message: 'POPULATED FINISH',
    };
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
