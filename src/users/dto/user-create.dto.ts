import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { UserRoleEnum } from "../enums/user-role.enum"
import { ApiProperty } from "@nestjs/swagger"

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Lalit Kumar" })
  name: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: "mailatlalitkumar@gmail.com" })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Lalit@123" })
  password: string

  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  @ApiProperty({ example: UserRoleEnum.CANDIDATE })
  role: UserRoleEnum
}
