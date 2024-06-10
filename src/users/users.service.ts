import { Injectable } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { User } from "./user.entity"

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>

  constructor(private readonly dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(User)
  }
}
