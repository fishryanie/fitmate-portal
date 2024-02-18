import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './controller';
import { TaskService } from './service';
import { Task, TaskSchema } from './schema';

@Module({
  imports: [JwtModule.register({}), MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TaskModule {}
