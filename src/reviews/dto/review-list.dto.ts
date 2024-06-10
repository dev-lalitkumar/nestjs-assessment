import { IsNumberString, IsOptional } from "class-validator"

export class ReviewListDto {
  @IsNumberString()
  @IsOptional()
  perPage: number

  @IsNumberString()
  @IsOptional()
  page: number
}
