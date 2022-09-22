import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateUniversities {
  @IsNotEmpty()
  @IsString()
  alpha_two_code: string;

  @IsNotEmpty()
  web_pages: [string];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  domains: [string];

  @IsOptional()
  @IsString()
  state_province: string;
}
