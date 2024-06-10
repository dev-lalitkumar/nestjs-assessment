import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { QuestionDifficultyLevelEnum } from "../enums/question-difficulty-level.enum"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class ReviewUpdateDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 2 })
  skillId: number

  @IsEnum(QuestionDifficultyLevelEnum)
  @IsOptional()
  @ApiPropertyOptional({ example: QuestionDifficultyLevelEnum.MEDIUM })
  difficultyLevel: QuestionDifficultyLevelEnum

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: "What is nest.js?" })
  question: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: "Nest.js is node.js framework." })
  response: string
}
