import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseInterceptors, UploadedFiles, Put, Req, Res, Query } from '@nestjs/common';
import { TaskService } from './service';

@Controller('/api/v1/tasks')
export class TasksController {
  constructor(private readonly tasksService: TaskService) {}
}
