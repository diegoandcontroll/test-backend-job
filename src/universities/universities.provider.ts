import { Connection } from 'mongoose';
import { UniversitieSchema } from '../schemas/universities.schema';

export const universitiesProviders = [
  {
    provide: 'UNIVERSITIES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Universities', UniversitieSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
