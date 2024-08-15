import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '#api/auth/auth.module';
import { CommonModule } from '#api/common/common.module';
import { ExerciseModule } from '#api/exercise/exercise.module';
import { CloudinaryModule } from './api/cloudinary/cloudinary.module';
import { RestaurantModule } from '#api/restaurant/module';
import { TaskModule } from '#api/task/module';
import { LoggerMiddleware } from 'middlewares/LoggerMiddleware';
import { EquipmentModule } from './api/equipment/equipment.module';
import { ExerciseCategoriesModule } from './api/exercise-categories/exercise-categories.module';
import { ExerciseGoalModule } from './api/exercise-goal/exercise-goal.module';
import { MuscleModule } from './api/muscle/muscle.module';
import { UserModule } from './api/user/user.module';
import { EXPIRES_TOKEN } from '#constant';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_NAME}?${process.env.MONGO_OPTIONS}`,
    ),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: EXPIRES_TOKEN },
    }),
    CloudinaryModule,
    AuthenticationModule,
    UserModule,
    MuscleModule,
    CommonModule,
    EquipmentModule,
    ExerciseGoalModule,
    ExerciseCategoriesModule,
    ExerciseModule,
    RestaurantModule,
    TaskModule,
  ],
  providers: [],
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
