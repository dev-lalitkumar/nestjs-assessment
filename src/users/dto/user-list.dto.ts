import { IsNumberString, IsOptional } from "class-validator"

export class UserListDto {
  @IsNumberString()
  @IsOptional()
  perPage: number

  @IsNumberString()
  @IsOptional()
  page: number
}
