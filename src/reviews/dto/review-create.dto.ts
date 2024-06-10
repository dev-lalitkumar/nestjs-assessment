import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { QuestionDifficultyLevelEnum } from "../enums/question-difficulty-level.enum"

export class ReviewCreateDto {
  @IsNumber()
  @IsNotEmpty()
  skillId: number

  @IsEnum(QuestionDifficultyLevelEnum)
  @IsNotEmpty()
  difficultyLevel: QuestionDifficultyLevelEnum

  @IsString()
  @IsNotEmpty()
  question: string

  @IsString()
  @IsNotEmpty()
  response: string

  @IsNumber()
  @IsNotEmpty()
  rating: number
}
