import { IsString, IsNotEmpty } from 'class-validator';
export class PopulateUniversities {
  @IsNotEmpty()
  @IsString()
  country: string;
}
