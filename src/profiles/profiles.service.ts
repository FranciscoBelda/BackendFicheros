import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Profile } from "./interfaces/profile.interface";

@Injectable()
export class ProfilesService {
  constructor(@InjectModel('Profile')private profileModel: Model<Profile>) {
  }
  async postProfile(profile: { imagePath: string; name: string }) {
    console.log(profile);
    const createdProfile = new this.profileModel(profile);
    return await createdProfile.save();
  }

  async getProfiles() {
    const profiles  = await this.profileModel.find();
    return {profiles};
  }
}
