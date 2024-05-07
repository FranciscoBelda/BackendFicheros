import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import 'dotenv/config';
import { ConfigModule } from "@nestjs/config";
import { ProfilesModule } from './profiles/profiles.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.URI
    ),
    ConfigModule.forRoot(),
    ProfilesModule/*,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','images')
    })*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
