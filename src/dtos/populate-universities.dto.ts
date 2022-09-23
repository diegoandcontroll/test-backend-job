import { IsNotEmpty } from 'class-validator';
export class PopulateUniversities {
  @IsNotEmpty()
  country: [string];
}
