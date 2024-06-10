import { Injectable } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { User } from "./user.entity"
import { UserCreateDto } from "./dto/user-create.dto"
import { UserUpdateDto } from "./dto/user-update.dto"

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>

  constructor(private readonly dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(User)
  }

  async list() {
    try {
    } catch (error) {}
  }

  async create(userCreateDto: UserCreateDto) {
    try {
    } catch (error) {}
  }

  async update(id: string, userUpdateDto: UserUpdateDto) {
    try {
    } catch (error) {}
  }

  async delete(id: string) {
    try {
    } catch (error) {}
  }
}
