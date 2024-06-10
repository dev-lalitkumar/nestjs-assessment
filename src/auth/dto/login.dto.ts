import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "candidate@gmail.com" })
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "password" })
  password: string
}
