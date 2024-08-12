import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '#api/auth/auth.module';
import { CommonModule } from '#api/common/common.module';
import { ExerciseModule } from '#api/exercise/exercise.module';
import { FirebaseStrategy } from './firebase/strategies/firebase.strategy';
import { GoogleStrategy } from './api/auth/strategies/socialGoogle.strategy';
import { CloudinaryModule } from './api/cloudinary/cloudinary.module';
import { RestaurantModule } from '#api/restaurant/module';
import { TaskModule } from '#api/task/module';
import { LoggerMiddleware } from 'middlewares/LoggerMiddleware';
import { EquipmentModule } from './api/equipment/equipment.module';
import { ExerciseCategoriesModule } from './api/exercise-categories/exercise-categories.module';
import { ExerciseGoalModule } from './api/exercise-goal/exercise-goal.module';
import { MuscleModule } from './api/muscle/muscle.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.lqsyp.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`,
    ),
    CloudinaryModule,
    AuthenticationModule,
    MuscleModule,
    CommonModule,
    ExerciseModule,
    RestaurantModule,
    TaskModule,
    EquipmentModule,
    ExerciseCategoriesModule,
    ExerciseGoalModule,
  ],
  providers: [JwtService, FirebaseStrategy, GoogleStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(TokenMiddleware).forRoutes({
    //   path: 'api/v1/auth/getUser',
    //   method: RequestMethod.GET,
    // });
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
