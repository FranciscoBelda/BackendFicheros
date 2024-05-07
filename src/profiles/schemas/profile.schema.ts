import { Schema } from "mongoose";

export const ProfileSchema: Schema = new Schema({
  name: String,
  imagePath: String
})
