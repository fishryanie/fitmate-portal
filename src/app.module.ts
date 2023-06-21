import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from '#api/common/common.module';
import { UserModule } from '#api/auth/auth.module';
import { TokenMiddleware } from './app.middleware';
import { FirebaseStrategy } from './firebase/strategies/firebase.strategy';
import { GoogleStrategy } from './firebase/strategies/google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PassportModule.register({ session: true }),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: './public',
    //     filename: (req, file, cb) => {
    //       const ext = file.mimetype.split('/')[1];
    //       cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    //     },
    //   }),
    // }),

    UserModule,
    CommonModule,
  ],
  providers: [JwtService, FirebaseStrategy, GoogleStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes({
      path: 'api/v1/auth/getUser',
      method: RequestMethod.GET,
    });
  }
}
