import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { QuestionDifficultyLevelEnum } from "../enums/question-difficulty-level.enum"

export class ReviewRateDto {
  @IsNumber()
  @IsOptional()
  rating: number
}
