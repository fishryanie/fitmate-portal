import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './controller';
import { TaskService } from './service';
import { Task, TaskSchema } from './schema';
import { COLLECTION_NAME } from '#constant';

@Module({
  imports: [MongooseModule.forFeature([{ name: COLLECTION_NAME.task, schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
