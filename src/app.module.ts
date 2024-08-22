import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './api/upload/cloudinary.module';
import { LoggerMiddleware } from 'middlewares/LoggerMiddleware';
import { UserModule } from './api/user/user.module';
import { EXPIRES_TOKEN } from '@constants';
import { SectionModule } from './api/section/section.module';
import { ChatModule } from './api/chat/chat.module';
import { ExerciseModule } from '@api/exercise/module';
import { AuthenticationModule } from '@api/auth/auth.module';
import { CommonModule } from '@api/common/module';
import { EquipmentModule } from '@api/equipment/module';
import { MuscleModule } from '@api/muscle/module';
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
    EquipmentModule,
    ExerciseModule,
    SectionModule,
    ChatModule,
    CommonModule,
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
