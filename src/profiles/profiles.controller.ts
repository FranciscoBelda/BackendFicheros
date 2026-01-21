import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import e from "express";
import { extname } from "path";

@Controller('profiles')
export class ProfilesController {
  myfile: string  = '';
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
      storage: diskStorage({
        destination: './images',
        filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
          const mimeType = file.mimetype.split('/');
          const fileType =  mimeType[1];
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const imagePath = file.originalname + uniqueSuffix +'.'+fileType;
          callback(null,imagePath)
        }}),
    }))
  async postProfile(@Body('name') name: string,
                    @UploadedFile() file: Express.Multer.File){
    try {
      console.log('file:', file);
      const mimeType = file.mimetype.split('/');
      const fileType = mimeType[1];
      const imagePath = 'http://localhost:3000/images/' + file.filename;
      const profile = { name, imagePath }
      console.log(profile);
      const createdProfile = await this.profileService.postProfile(profile);
      return {
        profile: {
          createdProfile
        }
      }
    }catch (error) {
      return {
        error: error,
      }
    }
  }

  @Get()
  async getProfiles(){
    return this.profileService.getProfiles();
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string) {
    try{
      const data = await this.profileService.deleteProfile(id);
      if (data){
        return {
          message: 'Profile deleted successfully.'
        }
      }
      return  new NotFoundException({
        message: 'Profile not found',
      })
    }catch(e){
      if (e instanceof NotFoundException){
        throw e;
      }
      return {
        error: e,
      }
    }
  }
}
