import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { User, UserSchema } from '#schema/UserSchema';
import { AppController } from './app.controller';
import { isAuthenticated } from './app.middleware';
import { AppService } from './app.service';
import { CommonService, UserService } from '#service';
import { CommonController, UserController } from '#controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      }),
    }),
  ],
  controllers: [AppController, UserController, CommonController],
  providers: [AppService, UserService, CommonService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(isAuthenticated)
  //     .exclude({ path: 'api/v1/video/:id', method: RequestMethod.GET })
  //     .forRoutes(VideoController);
  // }
}
