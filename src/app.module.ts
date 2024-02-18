import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '#api/auth/auth.module';
import { CommonModule } from '#api/common/common.module';
import { ExerciseModule } from '#api/exercise/exercise.module';
import { TokenMiddleware } from './app.middleware';
import { FirebaseStrategy } from './firebase/strategies/firebase.strategy';
import { GoogleStrategy } from './api/auth/strategies/socialGoogle.strategy';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TaskModule } from '#api/tasks/module';
import { RestaurantModule } from '#api/restaurant/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.lqsyp.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`,
    ),
    PassportModule.register({ session: true }),
    CloudinaryModule,
    UserModule,
    CommonModule,
    ExerciseModule,
    RestaurantModule,
    TaskModule,
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
