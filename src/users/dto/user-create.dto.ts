import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { UserRoleEnum } from "../enums/user-role.enum"

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: UserRoleEnum
}
