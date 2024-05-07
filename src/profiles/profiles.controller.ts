import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import e from "express";

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {
  }

/*  @UseInterceptors(FileInterceptor('file',{dest: 'images', fileFilter(req: any, file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer
    }, callback: (error: (Error | null), acceptFile: boolean) => void) {
      const allowedMimeTypes = ['image/png','image/jpg','image/jpeg'];
      allowedMimeTypes.includes(file.mimetype) ? callback(null, true): callback(null, false)
    }
  }))*/
  @Post('')
  @UseInterceptors(FileInterceptor('image',
    {
      dest: './images',
      storage: diskStorage({destination: './images',filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
          const mimeType = file.mimetype.split('/');
          const fileType =  mimeType[1];
          const imagePath = file.originalname + '.'+fileType;
          callback(null,imagePath)
        }}),
    }))
  async postProfile(@Body('name') name: string,
                    @UploadedFile() file: Express.Multer.File){
    console.log(file);
    const mimeType = file.mimetype.split('/');
    const fileType =  mimeType[1];
    const imagePath = 'http://localhost:3000/images/'+file.originalname + '.'+fileType;
    const profile = { name, imagePath }
    console.log(profile);
    const createdProfile = await this.profileService.postProfile(profile);
    return{
      profile: {
        createdProfile
      }
    }
  }

  @Get()
  async getProfiles(){
    return this.profileService.getProfiles();
  }
}
