import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '#api/auth/auth.module';
import { CommonModule } from '#api/common/common.module';
import { ExerciseModule } from '#api/exercise/exercise.module';
import { TokenMiddleware } from './app.middleware';
import { FirebaseStrategy } from './firebase/strategies/firebase.strategy';
import { GoogleStrategy } from './firebase/strategies/google.strategy';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PassportModule.register({ session: true }),
    CloudinaryModule,
    UserModule,
    CommonModule,
    ExerciseModule,
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
