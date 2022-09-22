import { IsString, IsOptional } from 'class-validator';
export class UpdateUniversities {
  @IsOptional()
  web_pages?: [string];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  domains?: [string];
}
