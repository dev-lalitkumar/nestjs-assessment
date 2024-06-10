import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator"
import { UserRoleEnum } from "../enums/user-role.enum"

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  name: string

  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  password: string

  @IsEnum(UserRoleEnum)
  @IsOptional()
  role: UserRoleEnum
}
