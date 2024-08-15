import { IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { WorkoutLocation } from 'enums/user';

export class UpdateConditionDto {
  @IsOptional()
  @IsNumber()
  @Min(50)
  @Max(300)
  height?: number;

  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(300)
  weight?: number;

  //   @IsOptional()
  //   @IsEnum(WorkoutGoalType)
  //   goal?: WorkoutGoalType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  workoutDays?: number;

  @IsOptional()
  @IsEnum(WorkoutLocation)
  location?: WorkoutLocation;
}
