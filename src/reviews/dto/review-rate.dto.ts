import { IsNotEmpty, IsNumber } from "class-validator"

export class ReviewRateDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number
}
