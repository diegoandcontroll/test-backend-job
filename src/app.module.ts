import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UniversitiesModule } from './universities/universities.module';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), UniversitiesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
