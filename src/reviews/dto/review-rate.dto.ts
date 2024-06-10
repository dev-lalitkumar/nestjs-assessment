import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class ReviewRateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 4 })
  rating: number
}
