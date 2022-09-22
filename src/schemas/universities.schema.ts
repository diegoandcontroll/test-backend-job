import * as mongoose from 'mongoose';

export const UniversitieSchema = new mongoose.Schema({
  alpha_two_code: String,
  web_pages: [String],
  name: String,
  country: String,
  domains: [String],
  state_province: String,
});
