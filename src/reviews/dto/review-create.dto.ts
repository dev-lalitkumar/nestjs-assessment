import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { QuestionDifficultyLevelEnum } from "../enums/question-difficulty-level.enum"
import { ApiProperty } from "@nestjs/swagger"

export class ReviewCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  skillId: number

  @IsEnum(QuestionDifficultyLevelEnum)
  @IsNotEmpty()
  @ApiProperty({ example: QuestionDifficultyLevelEnum.EASY })
  difficultyLevel: QuestionDifficultyLevelEnum

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "What is node.js?" })
  question: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Node.js is a runtime environment." })
  response: string
}
