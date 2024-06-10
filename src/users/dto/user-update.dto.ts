import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator"
import { UserRoleEnum } from "../enums/user-role.enum"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: "Lalit Kumar" })
  name: string

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ example: "mailatlalitkumar@gmail.com" })
  email: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: "Lalit@123" })
  password: string

  @IsEnum(UserRoleEnum)
  @IsOptional()
  @ApiPropertyOptional({ example: UserRoleEnum.CANDIDATE })
  role: UserRoleEnum
}
