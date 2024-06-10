import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common"
import { UsersService } from "./users.service"
import { UserCreateDto } from "./dto/user-create.dto"
import { UserUpdateDto } from "./dto/user-update.dto"
import { UserListDto } from "./dto/user-list.dto"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async list(@Query() userListDto: UserListDto) {
    return await this.usersService.list(userListDto)
  }

  @Post()
  async create(@Body() userCreateDto: UserCreateDto) {
    return await this.usersService.create(userCreateDto)
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() userUpdateDto: UserUpdateDto) {
    return await this.usersService.update(id, userUpdateDto)
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.usersService.delete(id)
  }
}
