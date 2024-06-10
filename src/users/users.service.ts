import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { DataSource, Repository } from "typeorm"
import { User } from "./user.entity"
import { UserCreateDto } from "./dto/user-create.dto"
import { UserUpdateDto } from "./dto/user-update.dto"
import { UserListDto } from "./dto/user-list.dto"
import { Review } from "src/reviews/review.entity"
import * as bcrypt from "bcrypt"
import { UserRoleEnum } from "./enums/user-role.enum"

@Injectable()
export class UsersService {
  private usersRepository: Repository<User>
  private reviewsRepository: Repository<Review>

  constructor(private readonly dataSource: DataSource) {
    this.usersRepository = this.dataSource.getRepository(User)
    this.reviewsRepository = this.dataSource.getRepository(Review)
  }

  async onModuleInit() {
    try {
      const usersCount = await this.usersRepository.count()
      if (usersCount === 0) {
        const candidate = this.usersRepository.create({
          email: "candidate@gmail.com",
          name: "Aman",
          role: UserRoleEnum.CANDIDATE,
          password: await bcrypt.hash("password", await bcrypt.genSalt())
        })
        await this.usersRepository.save(candidate)
        const reviewer = this.usersRepository.create({
          email: "reviewer@gmail.com",
          name: "Deepak",
          role: UserRoleEnum.REVIEWER,
          password: await bcrypt.hash("password", await bcrypt.genSalt())
        })
        await this.usersRepository.save(reviewer)
      }
    } catch (error) {}
  }

  async findOne(username: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: username }
      })
      return user
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async list(userListDto: UserListDto) {
    const { page = 1, perPage = 15 } = userListDto
    try {
      const [users, total] = await this.usersRepository.findAndCount({
        select: ["id", "name", "email", "role", "createdAt"],
        skip: perPage * (page - 1),
        take: perPage,
        order: { name: "ASC" }
      })
      return {
        total,
        perPage,
        page,
        totalPages: Math.ceil(total / perPage),
        users
      }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to fetch the users`)
    }
  }

  async create(userCreateDto: UserCreateDto) {
    const { email, name, password, role } = userCreateDto
    try {
      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())
      let user = this.usersRepository.create({
        email,
        name,
        role,
        password: hashedPassword
      })
      const { password: p, ...rest } = await this.usersRepository.save(user)
      return rest
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to create user`)
    }
  }

  async update(id: string, userUpdateDto: UserUpdateDto) {
    const { email, name, password, role } = userUpdateDto
    try {
      const user = await this.usersRepository.findOneOrFail({ where: { id } })
      if (email) user.email = email
      if (name) user.name = name
      if (role) user.role = role
      if (password) user.password = password
      const { password: p, ...rest } = await this.usersRepository.save(user)
      return rest
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to update the user`)
    }
  }

  async delete(id: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({ where: { id } })
      await this.usersRepository.remove(user)
      return { message: "User deleted successfully" }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(`Failed to delete user`)
    }
  }
}
