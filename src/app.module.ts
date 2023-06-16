import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { isAuthenticated } from './app.middleware';
import { CommonModule } from '#api/common/common.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { UserModule } from '#api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: './public',
    //     filename: (req, file, cb) => {
    //       const ext = file.mimetype.split('/')[1];
    //       cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    //     },
    //   }),
    // }),

    CommonModule,
    UserModule,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(isAuthenticated)
  //     .exclude({ path: 'api/v1/video/:id', method: RequestMethod.GET })
  //     .forRoutes(VideoController);
  // }
}
