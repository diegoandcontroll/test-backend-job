import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { universitiesProviders } from './universities.provider';
import { DatabaseModule } from 'src/db/db.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [UniversitiesController],
  providers: [UniversitiesService, ...universitiesProviders],
})
export class UniversitiesModule {}
