import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { QuestionDifficultyLevelEnum } from "../enums/question-difficulty-level.enum"

export class ReviewUpdateDto {
  @IsNumber()
  @IsOptional()
  skillId: number

  @IsEnum(QuestionDifficultyLevelEnum)
  @IsOptional()
  difficultyLevel: QuestionDifficultyLevelEnum

  @IsString()
  @IsOptional()
  question: string

  @IsString()
  @IsOptional()
  response: string

  @IsNumber()
  @IsOptional()
  rating: number
}
