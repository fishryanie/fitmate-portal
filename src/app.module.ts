import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UserController } from '#controllers/UserController';
import { User, UserSchema } from '#schema/UserSchema';
import { VideoController } from '#controllers/VideoController';
import { UserService } from '#service/UserService';
import { AppController } from './app.controller';
import { isAuthenticated } from './app.middleware';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Test'),
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
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({ path: 'api/v1/video/:id', method: RequestMethod.GET })
      .forRoutes(VideoController);
  }
}
