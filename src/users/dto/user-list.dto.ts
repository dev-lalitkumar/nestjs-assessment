import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumberString, IsOptional } from "class-validator"

export class UserListDto {
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({ example: 15 })
  perPage: number

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({ example: 1 })
  page: number
}
