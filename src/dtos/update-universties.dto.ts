import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateUniversities {
  @IsNotEmpty()
  web_pages: [string];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  domains: [string];
}
