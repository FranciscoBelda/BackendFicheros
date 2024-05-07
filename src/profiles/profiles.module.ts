import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileSchema } from "./schemas/profile.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Profile',
        schema: ProfileSchema,
        collection: 'profilesUpload'
      }
    ])
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService]
})
export class ProfilesModule {}
