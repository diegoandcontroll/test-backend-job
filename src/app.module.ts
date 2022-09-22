import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversitiesModule } from './universities/universities.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), UniversitiesModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
