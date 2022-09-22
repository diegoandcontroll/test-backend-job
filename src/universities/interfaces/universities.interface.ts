import { Document } from 'mongoose';

export interface Universitie extends Document {
  readonly alpha_two_code: string;
  readonly web_pages: [string];
  readonly name: string;
  readonly country: string;
  readonly domains: [string];
  readonly state_province: boolean;
}
